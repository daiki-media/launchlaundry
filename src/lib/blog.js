import {
  clamp,
  decodeEntities,
  extractFaqs,
  readingTime,
  stripTags,
  transformContent,
} from "./wpHtml";
import {
  DEFAULT_FALLBACK,
  PATH_CORRECTIONS,
  SECTION_FALLBACKS,
  SITE_ROUTES,
} from "./siteRoutes";

/**
 * The blog's data layer: read the posts out of the WordPress REST API and hand
 * the rest of the app a clean, site-shaped object.
 *
 * This runs at BUILD TIME only. `output: "export"` in next.config.mjs means
 * `next build` prerenders every route, so the deployed site is plain HTML with
 * no runtime dependency on the WordPress install. Re-run the build to publish
 * newly written posts.
 *
 * Posts live at the site root — /electrolux-laundry-equipment-price-malaysia-2026
 * — matching the permalinks the blog subdomain already uses, so existing links
 * and rankings carry over. See src/app/[slug]/page.js.
 */

const WP_BASE =
  process.env.NEXT_PUBLIC_WP_API?.replace(/\/+$/, "") ||
  "https://blog.launchlaundry.com.my/wp-json/wp/v2";

export const POSTS_PER_PAGE = 12;

// How many posts to pull per API request. Next's data cache refuses anything
// over 2MB, and each prerender worker would then refetch the whole archive —
// 40 posts plus embeds lands around 1.4MB, so the fetch happens once per build.
const FETCH_BATCH = 40;

// Only the fields the site actually renders. Dropping `yoast_head` (the raw
// <head> markup Yoast also ships) takes roughly a quarter off the response.
const POST_FIELDS = [
  "id",
  "slug",
  "title",
  "content",
  "excerpt",
  "date",
  "date_gmt",
  "modified",
  "modified_gmt",
  "author",
  "featured_media",
  "categories",
  "yoast_head_json",
  "_links",
].join(",");

/** Routes this site owns. A post slug that collided with one would shadow it. */
const RESERVED_SLUGS = new Set([
  "about",
  "blog",
  "case-study",
  "contact-us",
  "location",
  "products",
  "privacy-policy",
  "service",
  "services",
  "sitemap.xml",
  "robots.txt",
  "404",
  "index",
  "_next",
  "images",
]);

async function fetchJson(url, attempt = 1) {
  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      // Prerender pulls the archive once; let Next cache it for the build.
      cache: "force-cache",
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    return await res.json();
  } catch (error) {
    if (attempt >= 3) {
      throw new Error(
        `Blog build failed: could not read ${url} after 3 attempts (${error.message}). ` +
          `The WordPress API at ${WP_BASE} must be reachable during \`next build\`.`
      );
    }
    await new Promise((resolve) => setTimeout(resolve, attempt * 1500));
    return fetchJson(url, attempt + 1);
  }
}

/** The first image in the body — most posts have no WordPress featured image. */
function firstInlineImage(html) {
  const match = String(html || "").match(/<img\b[^>]*\bsrc="([^"]+)"[^>]*>/i);
  if (!match) return null;
  const alt = match[0].match(/\balt="([^"]*)"/i);
  return { url: match[1], alt: decodeEntities(alt?.[1] || "") };
}

/**
 * Build the link resolver handed to transformContent: correct what we know is
 * wrong, keep what exists, and send anything left over to the nearest hub so no
 * post ships a link to a page that was never built.
 */
function makeLinkResolver(postSlugs) {
  return (path) => {
    const corrected = PATH_CORRECTIONS[path] || path;
    if (postSlugs.has(corrected.slice(1)) || SITE_ROUTES.has(corrected)) return corrected;

    const section = SECTION_FALLBACKS.find(([pattern]) => pattern.test(corrected));
    return section ? section[1] : DEFAULT_FALLBACK;
  };
}

function normalise(post, resolvePath) {
  const yoast = post.yoast_head_json || {};
  const embedded = post._embedded || {};

  const title = decodeEntities(post.title?.rendered);
  const { html, headings } = transformContent(post.content?.rendered, resolvePath);
  const inline = firstInlineImage(post.content?.rendered);

  const featured = embedded["wp:featuredmedia"]?.[0];
  const image =
    featured?.source_url ||
    yoast.og_image?.[0]?.url ||
    inline?.url ||
    null;
  const imageAlt =
    decodeEntities(featured?.alt_text) || inline?.alt || title;

  const category =
    (embedded["wp:term"] || [])
      .flat()
      .find((term) => term?.taxonomy === "category" && term.slug !== "uncategorized") || null;

  const excerptText = clamp(stripTags(post.excerpt?.rendered), 200);

  // Yoast is the editorial source of truth; fall back to the excerpt so every
  // post still ships a usable description.
  const metaDescription = clamp(
    decodeEntities(yoast.description) || excerptText || `${title} — Launch Laundry Malaysia.`,
    160
  );

  return {
    id: post.id,
    slug: post.slug,
    title,
    metaTitle: clamp(decodeEntities(yoast.title) || `${title} | Launch Laundry`, 70),
    metaDescription,
    excerpt: excerptText || metaDescription,
    html,
    headings,
    faqs: extractFaqs(post.content?.rendered),
    image,
    imageAlt,
    date: post.date_gmt ? `${post.date_gmt}Z` : post.date,
    modified: post.modified_gmt ? `${post.modified_gmt}Z` : post.modified,
    author: decodeEntities(embedded.author?.[0]?.name || yoast.author || "Launch Laundry"),
    category: category
      ? { name: decodeEntities(category.name), slug: category.slug }
      : { name: "Laundry Insights", slug: "insights" },
    // Deliberately no `noindex` flag. Yoast's REST `robots` value describes the
    // API request URL, not the post — adding `_fields` or `status` to the query
    // is enough to make it report "noindex" for the entire archive. Every
    // published post is indexable here; use WordPress to unpublish instead.
    ...readingTime(post.content?.rendered),
  };
}

let cache;

/** Every published post, newest first. Fetched once per build. */
export function getAllPosts() {
  if (!cache) {
    cache = (async () => {
      const head = await fetch(`${WP_BASE}/posts?per_page=1&_fields=id`, {
        headers: { Accept: "application/json" },
        cache: "force-cache",
      });
      const total = Number(head.headers.get("x-wp-total") || 0);
      if (!total) throw new Error(`Blog build failed: ${WP_BASE} reported no published posts.`);

      const batches = Math.ceil(total / FETCH_BATCH);
      const pages = await Promise.all(
        Array.from({ length: batches }, (_, i) =>
          fetchJson(
            `${WP_BASE}/posts?per_page=${FETCH_BATCH}&page=${i + 1}` +
              `&orderby=date&order=desc&_embed=1&_fields=${POST_FIELDS}`
          )
        )
      );

      const seen = new Set();
      const raw = pages.flat().filter((post) => {
        if (!post?.slug || RESERVED_SLUGS.has(post.slug) || seen.has(post.slug)) return false;
        seen.add(post.slug);
        return true;
      });

      // Link rewriting needs the full slug list, so resolve it before normalising.
      const resolvePath = makeLinkResolver(seen);

      return raw
        .map((post) => normalise(post, resolvePath))
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    })();
  }
  return cache;
}

export async function getPostSlugs() {
  return (await getAllPosts()).map((post) => post.slug);
}

export async function getPost(slug) {
  return (await getAllPosts()).find((post) => post.slug === slug) || null;
}

/** Total number of listing pages at POSTS_PER_PAGE per page. */
export async function getPageCount() {
  const posts = await getAllPosts();
  return Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
}

/** One slice of the archive, plus the numbers the pager needs. */
export async function getPostsPage(page = 1) {
  const posts = await getAllPosts();
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const current = Math.min(Math.max(1, Number(page) || 1), totalPages);
  const start = (current - 1) * POSTS_PER_PAGE;

  return {
    posts: posts.slice(start, start + POSTS_PER_PAGE),
    page: current,
    totalPages,
    total: posts.length,
    from: start + 1,
    to: Math.min(start + POSTS_PER_PAGE, posts.length),
  };
}

/**
 * Up to `limit` further reads — same category first, then the newest posts, so
 * every article ends with real internal links rather than a dead end.
 */
export async function getRelatedPosts(post, limit = 3) {
  const posts = await getAllPosts();
  const others = posts.filter((candidate) => candidate.slug !== post.slug);
  const sameCategory = others.filter(
    (candidate) => candidate.category.slug === post.category.slug
  );

  // Same-category first, then the newest of everything else as a top-up.
  const picked = new Map();
  for (const candidate of [...sameCategory, ...others]) {
    if (picked.size >= limit) break;
    picked.set(candidate.slug, candidate);
  }
  return [...picked.values()];
}

/** Listing-page path — page 1 is /blog, the rest are /blog/page/N. */
export function blogPagePath(page) {
  return page <= 1 ? "/blog" : `/blog/page/${page}`;
}

/** A post's canonical path on this site. */
export function postPath(slug) {
  return `/${slug}`;
}

/** Human-readable date for the byline, stable between server and client. */
export function formatDate(value) {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
