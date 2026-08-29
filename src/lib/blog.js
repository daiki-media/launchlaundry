import {
  clamp,
  decodeEntities,
  extractFaqs,
  readingTime,
  stripTags,
  transformContent,
} from "./wpHtml";
import { SITE_URL } from "@/components/seo/JsonLd";
import {
  DEFAULT_FALLBACK,
  PATH_CORRECTIONS,
  SECTION_FALLBACKS,
  SITE_ROUTES,
} from "./siteRoutes";

/**
 * The blog's data layer: read the posts out of our Laravel CMS API and hand the
 * rest of the app a clean, site-shaped object.
 *
 * Build time only — `output: "export"` prerenders every route, so the deployed
 * site never calls the CMS. Posts live at the site root to keep the permalinks
 * the blog subdomain used to serve.
 */

const CMS_BASE =
  process.env.NEXT_PUBLIC_CMS_API?.replace(/\/+$/, "") ||
  "https://cms.launchlaundry.com.my/api";

// Uploads live at the CMS root, not under /api, so staging moves with the env var.
const CMS_ORIGIN = CMS_BASE.replace(/\/api$/, "");

export const POSTS_PER_PAGE = 12;

// Shared hosting starts returning 500s when several bodies render at once.
const FETCH_CONCURRENCY = 8;

// The API throttles at 60 requests a minute per IP and a build needs ~190, so
// space them out rather than burst into a 429 and lose a minute recovering.
const REQUESTS_PER_MINUTE = 55;
const MIN_REQUEST_GAP_MS = Math.ceil(60000 / REQUESTS_PER_MINUTE);

// Every prerender worker calls getAllPosts, but only the first crosses the
// network; a reply this fast came from the build cache and costs us no quota.
const CACHE_HIT_MS = 25;

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

// Shared by every caller, so the workers stay collectively under the throttle.
let nextSlot = 0;

function takeSlot() {
  const now = Date.now();
  const at = Math.max(now, nextSlot);
  nextSlot = at + MIN_REQUEST_GAP_MS;
  return at === now ? Promise.resolve() : new Promise((resolve) => setTimeout(resolve, at - now));
}

function releaseSlot() {
  nextSlot = Math.max(Date.now(), nextSlot - MIN_REQUEST_GAP_MS);
}

function defer(ms) {
  nextSlot = Math.max(nextSlot, Date.now() + ms);
}

async function fetchJson(url, attempt = 1, throttled = 0) {
  await takeSlot();
  const startedAt = Date.now();
  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      cache: "force-cache",
    });
    if (Date.now() - startedAt < CACHE_HIT_MS) releaseSlot();

    // The throttle, not a failure: wait it out without spending an attempt.
    if (res.status === 429) {
      if (throttled >= 5) throw new Error("rate limited repeatedly (HTTP 429)");
      const wait = (Number(res.headers.get("retry-after")) || 60) * 1000 + 1000;
      defer(wait);
      return fetchJson(url, attempt, throttled + 1);
    }

    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    return await res.json();
  } catch (error) {
    if (attempt >= 3) {
      throw new Error(
        `Blog build failed: could not read ${url} after 3 attempts (${error.message}). ` +
          `The CMS API at ${CMS_BASE} must be reachable during \`next build\`.`
      );
    }
    await new Promise((resolve) => setTimeout(resolve, attempt * 1500));
    return fetchJson(url, attempt + 1, throttled);
  }
}

async function mapWithConcurrency(items, limit, task) {
  const results = new Array(items.length);
  let next = 0;

  async function worker() {
    while (next < items.length) {
      const index = next++;
      results[index] = await task(items[index], index);
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

/** `blogs/1787813365-washer.jpg` -> a full URL. Absolute values pass through. */
function mediaUrl(path) {
  const value = String(path || "").trim();
  if (!value) return null;
  if (/^(?:https?:)?\/\//i.test(value)) return value;
  return `${CMS_ORIGIN}/${value.replace(/^\/+/, "")}`;
}

function kebabCase(text) {
  return String(text)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Fallback for a post with no featured image.
 *
 * Reads the body *after* transformContent has run, so the src is a real URL on
 * this site rather than the relative WordPress path the CMS stores. JSON-LD and
 * the OG tags both need it absolute.
 */
function firstInlineImage(html) {
  const match = String(html || "").match(/<img\b[^>]*\bsrc="([^"]+)"[^>]*>/i);
  if (!match) return null;
  const alt = match[0].match(/\balt="([^"]*)"/i);
  const url = match[1].startsWith("/") ? `${SITE_URL}${match[1]}` : match[1];
  return { url, alt: decodeEntities(alt?.[1] || "") };
}

function makeLinkResolver(postSlugs) {
  return (path) => {
    const corrected = PATH_CORRECTIONS[path] || path;
    if (postSlugs.has(corrected.slice(1)) || SITE_ROUTES.has(corrected)) return corrected;

    const section = SECTION_FALLBACKS.find(([pattern]) => pattern.test(corrected));
    return section ? section[1] : DEFAULT_FALLBACK;
  };
}

function normalise(post, resolvePath) {
  const content = post.content || "";

  const title = decodeEntities(post.title);
  const { html, headings } = transformContent(content, resolvePath);
  const inline = firstInlineImage(html);

  // No excerpt field in the CMS — derive one from the top of the body.
  const excerptText = clamp(stripTags(content), 200);

  const metaDescription = clamp(
    decodeEntities(post.meta_description) || excerptText || `${title} — Launch Laundry Malaysia.`,
    160
  );

  // "Uncategorized" rode over from WordPress on a third of the archive. Treat it
  // as unset rather than printing it on the cards.
  const categoryName = decodeEntities(post.category);
  const category =
    categoryName && categoryName.toLowerCase() !== "uncategorized" ? categoryName : null;

  return {
    id: post.id,
    slug: post.slug,
    title,
    metaTitle: clamp(decodeEntities(post.meta_title) || `${title} | Launch Laundry`, 70),
    metaDescription,
    excerpt: excerptText || metaDescription,
    html,
    headings,
    faqs: extractFaqs(content),
    image: mediaUrl(post.featuredImage) || inline?.url || null,
    imageAlt: decodeEntities(post.featuredImageAlt) || inline?.alt || title,
    // Already ISO-8601 UTC, `Z` included.
    date: post.created_at,
    modified: post.updated_at,
    author: decodeEntities(post.author) || "Launch Laundry",
    category: category
      ? { name: category, slug: kebabCase(category) }
      : { name: "Laundry Insights", slug: "insights" },
    // No `noindex` flag: /api/blogs only returns published posts. The index
    // endpoint's `read_time` is an estimate, so count the real words instead.
    ...readingTime(content),
  };
}

let cache;

/** Every published post, newest first. Fetched once per build. */
export function getAllPosts() {
  if (!cache) {
    cache = (async () => {
      const index = await fetchJson(`${CMS_BASE}/blogs`);
      const list = Array.isArray(index) ? index : [];
      if (!list.length) {
        throw new Error(`Blog build failed: ${CMS_BASE} reported no published posts.`);
      }

      const seen = new Set();
      const wanted = list.filter((post) => {
        if (!post?.slug || RESERVED_SLUGS.has(post.slug) || seen.has(post.slug)) return false;
        seen.add(post.slug);
        return true;
      });

      // Link rewriting needs the full slug list, so build it first.
      const resolvePath = makeLinkResolver(seen);

      // Bodies only exist on the detail endpoint: one request per post.
      const bodies = await mapWithConcurrency(wanted, FETCH_CONCURRENCY, (post) =>
        fetchJson(`${CMS_BASE}/blogs/${encodeURIComponent(post.slug)}`)
      );

      return bodies
        .map((body, index) => normalise({ ...wanted[index], ...body }, resolvePath))
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

export async function getPageCount() {
  const posts = await getAllPosts();
  return Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
}

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

/** Up to `limit` further reads: same category first, then the newest. */
export async function getRelatedPosts(post, limit = 3) {
  const posts = await getAllPosts();
  const others = posts.filter((candidate) => candidate.slug !== post.slug);
  const sameCategory = others.filter(
    (candidate) => candidate.category.slug === post.category.slug
  );

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

/** Byline date, stable between server and client. */
export function formatDate(value) {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
