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


const CMS_BASE ="https://cms.launchlaundry.com.my/api";

const CMS_ORIGIN = CMS_BASE.replace(/\/api$/, "");

export const POSTS_PER_PAGE = 12;

const FETCH_CONCURRENCY = 8;

const REQUESTS_PER_MINUTE = 55;
const MIN_REQUEST_GAP_MS = Math.ceil(60000 / REQUESTS_PER_MINUTE);

const CACHE_HIT_MS = 25;
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

  const excerptText = clamp(stripTags(content), 200);

  const metaDescription =
    decodeEntities(post.meta_description) ||
    clamp(excerptText, 160) ||
    `${title} — Launch Laundry Malaysia.`;

  const categoryName = decodeEntities(post.category);
  const category =
    categoryName && categoryName.toLowerCase() !== "uncategorized" ? categoryName : null;

  return {
    id: post.id,
    slug: post.slug,
    title,
    metaTitle: decodeEntities(post.meta_title) || `${title} | Launch Laundry`,
    metaDescription,
    excerpt: excerptText || metaDescription,
    html,
    headings,
    faqs: extractFaqs(content),
    image: mediaUrl(post.featuredImage) || inline?.url || null,
    imageAlt: decodeEntities(post.featuredImageAlt) || inline?.alt || title,
    date: post.created_at,
    modified: post.updated_at,
    author: decodeEntities(post.author) || "Launch Laundry",
    category: category
      ? { name: category, slug: kebabCase(category) }
      : { name: "Laundry Insights", slug: "insights" },
    ...readingTime(content),
  };
}

let cache;

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
