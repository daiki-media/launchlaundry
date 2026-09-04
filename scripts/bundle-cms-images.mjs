/**
 * Pull every CMS-hosted image into the static export.
 *
 * The site is `output: "export"`, but blog images were the one thing it did not
 * actually export: mediaUrl() in src/lib/blog.js writes
 * `https://cms.launchlaundry.com.my/blogs/x.webp` straight into the HTML, so a
 * visitor's browser fetched them from the CMS at page-view time. That made the
 * public site only as reliable as the CMS -- and the CMS sits behind Hostinger
 * CDN's bot challenge, which answers 403 with an HTML "checking your browser"
 * page to any IP it distrusts. An <img> cannot solve a JavaScript challenge, so
 * those visitors saw a broken image. It depended on the viewer's IP, which is
 * why it looked intermittent and vanished when you changed networks.
 *
 * This runs after `next build` and rewrites the export so the CMS is never
 * contacted by a browser again. It reads the URLs out of the emitted files
 * rather than calling the API a second time -- a build already spends ~190
 * requests against a 60/min limit, and doubling that would trip the throttle
 * this codebase works hard to stay under.
 *
 * Both .html and .txt are rewritten. Next 16 writes an RSC payload beside every
 * page, and a client-side navigation reads the image URL from there, so
 * rewriting only the HTML would leave the old CMS URLs live on any route the
 * visitor reached by clicking rather than loading.
 */

import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT_DIR = path.resolve("out");

// Mirrors src/lib/blog.js: uploads sit at the CMS root, not under /api.
const CMS_ORIGIN = (
  process.env.NEXT_PUBLIC_CMS_API?.replace(/\/+$/, "") ||
  "https://cms.launchlaundry.com.my/api"
).replace(/\/api$/, "");

// Read rather than import: JsonLd.jsx is JSX and this is plain node, but the
// constant should still have exactly one definition in the repo.
const SITE_URL = (
  await readFile("src/components/seo/JsonLd.jsx", "utf8")
).match(/export const SITE_URL\s*=\s*"([^"]+)"/)?.[1];

if (!SITE_URL) {
  throw new Error(
    "could not read SITE_URL from src/components/seo/JsonLd.jsx -- did the constant move?"
  );
}

// Sits beside /blogs/content-images (the WordPress-era images already committed
// to public/), so everything the blog serves shares one parent.
const LOCAL_DIR = "/blogs/cms";

// Shared hosting behind a CDN. Eight parallel body renders already provoke 500s
// from this host (see FETCH_CONCURRENCY in src/lib/blog.js), so stay under that
// for what is a much heavier per-request payload.
const CONCURRENCY = 6;
const ATTEMPTS = 3;

const IMAGE_EXT = "webp|jpe?g|png|gif|avif|svg";

/** Every image URL on the CMS origin, wherever it appears in a built file. */
const urlPattern = new RegExp(
  `${CMS_ORIGIN.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/[^\\s"'\\\\)]+?\\.(?:${IMAGE_EXT})`,
  "gi"
);

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

/**
 * A local filename for a downloaded image.
 *
 * Keeps the CMS's own filename so the export stays greppable, and appends a
 * digest of the bytes. Hashing the content rather than the URL does two jobs:
 * two different CMS paths sharing a basename cannot overwrite each other, and
 * re-uploading a different image under the same CMS filename produces a new
 * name here -- which is what lets .htaccess cache these forever without a
 * re-upload leaving stale bytes in every visitor's browser.
 */
function localName(url, body) {
  const base = path.posix.basename(new URL(url).pathname);
  const ext = path.posix.extname(base);
  const stem = base.slice(0, base.length - ext.length) || "image";
  const digest = createHash("sha1").update(body).digest("hex").slice(0, 8);
  return `${stem}-${digest}${ext.toLowerCase()}`;
}

async function download(url) {
  let lastError;
  for (let attempt = 1; attempt <= ATTEMPTS; attempt += 1) {
    try {
      const res = await fetch(url, { redirect: "follow" });

      // A 404 is the CMS telling us the row points at a file nobody uploaded.
      // That is a content problem, not a build problem: leave the URL alone,
      // say so, and let the rest of the export ship.
      if (res.status === 404) return { missing: true };

      if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);

      // The bot challenge answers 403 with HTML, but a misconfigured edge can
      // also answer 200 with it. Trust the content type, not the status.
      const type = res.headers.get("content-type") || "";
      if (!/^image\//i.test(type)) {
        throw new Error(
          `expected an image, got "${type}" -- the CDN bot challenge is most likely answering instead of the CMS`
        );
      }

      return { body: Buffer.from(await res.arrayBuffer()) };
    } catch (error) {
      lastError = error;
      if (attempt < ATTEMPTS) {
        await new Promise((r) => setTimeout(r, attempt * 1500));
      }
    }
  }
  throw new Error(`${url}: ${lastError.message}`);
}

async function pool(items, worker) {
  let cursor = 0;
  const runners = Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      await worker(items[index]);
    }
  });
  await Promise.all(runners);
}

async function main() {
  const files = [];
  for await (const file of walk(OUT_DIR)) {
    if (/\.(?:html|txt)$/i.test(file)) files.push(file);
  }

  const sources = new Map(); // absolute path -> its text
  const urls = new Set();
  for (const file of files) {
    const text = await readFile(file, "utf8");
    const found = text.match(urlPattern);
    if (!found) continue;
    sources.set(file, text);
    for (const url of found) urls.add(url);
  }

  if (urls.size === 0) {
    console.log("[cms-images] no CMS image URLs in the export -- nothing to do");
    return;
  }

  console.log(`[cms-images] ${urls.size} images referenced across ${sources.size} files`);
  await mkdir(path.join(OUT_DIR, "blogs", "cms"), { recursive: true });

  const mapping = new Map(); // remote url -> local filename
  const missing = [];
  const failed = [];

  await pool([...urls], async (url) => {
    try {
      const result = await download(url);
      if (result.missing) {
        missing.push(url);
        return;
      }
      const name = localName(url, result.body);
      await writeFile(path.join(OUT_DIR, "blogs", "cms", name), result.body);
      mapping.set(url, name);
    } catch (error) {
      failed.push(error.message);
    }
  });

  // Anything that is not a plain 404 means the CMS is unreachable or the CDN is
  // answering for it. Shipping then would bake broken URLs into a deploy that
  // rsync --delete makes live, so stop here and leave the previous site up.
  if (failed.length) {
    console.error(`[cms-images] ${failed.length} image(s) could not be downloaded:`);
    for (const message of failed.slice(0, 10)) console.error(`  - ${message}`);
    throw new Error(
      "refusing to ship an export that still points at the CMS -- fix reachability and rebuild"
    );
  }

  if (missing.length) {
    console.warn(`[cms-images] ${missing.length} image(s) return 404 on the CMS and were left as-is:`);
    for (const url of missing) console.warn(`  - ${url}`);
  }

  let rewritten = 0;
  for (const [file, text] of sources) {
    let next = text;
    for (const [url, name] of mapping) {
      const local = `${LOCAL_DIR}/${name}`;
      // src/srcset take a root-relative path so the same export works on
      // staging and production without knowing which host it landed on.
      next = next.replaceAll(`src="${url}"`, `src="${local}"`);
      // Everything left is og:image, twitter:image or JSON-LD, and each of
      // those is only valid as an absolute URL.
      next = next.replaceAll(url, `${SITE_URL}${local}`);
    }
    if (next !== text) {
      await writeFile(file, next);
      rewritten += 1;
    }
  }

  console.log(
    `[cms-images] downloaded ${mapping.size} image(s) into out${LOCAL_DIR} and rewrote ${rewritten} file(s)`
  );
}

await main();
