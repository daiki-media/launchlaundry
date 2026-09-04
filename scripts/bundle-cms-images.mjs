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

/**
 * Next inlines the RSC payload into every page as a run of
 * `self.__next_f.push([1,"..."])` calls, and writes the same stream verbatim
 * into the .txt files beside it.
 *
 * Swapping a URL in there is not a plain string replace. A flight row that
 * carries text is introduced by its byte length -- `25:T852,{...}` -- and the
 * client reads exactly that many bytes before looking for the next row. A local
 * path is shorter than the CMS URL it replaces, so editing the row without
 * recounting leaves the reader stranded mid-row, every row after it parses as
 * garbage, and hydration dies with "Connection closed." (React error #412).
 * React then throws the server-rendered DOM away, which is a blank page.
 *
 * So the payload is parsed into rows, rewritten a row at a time, and re-emitted
 * with the lengths recounted.
 */
const PUSH_PATTERN = /self\.__next_f\.push\(\[1,("(?:[^"\\]|\\.)*")\]\)/g;

// Rows whose body is preceded by a hex byte length rather than running to the
// next newline: "T" is text, the rest are the typed-array kinds.
const SIZED_ROW_TAGS = new Set([..."TAOoUSsLlGgMmV"]);

/** Split a flight stream into rows. Offsets and lengths are bytes, not chars. */
function parseFlightRows(buffer) {
  const rows = [];
  let at = 0;
  while (at < buffer.length) {
    const colon = buffer.indexOf(0x3a /* : */, at);
    if (colon < 0) throw new Error(`no row id at byte ${at}`);

    const id = buffer.toString("latin1", at, colon);
    if (!/^[0-9a-f]*$/.test(id)) throw new Error(`bad row id "${id}" at byte ${at}`);

    let cursor = colon + 1;
    const first = String.fromCharCode(buffer[cursor]);
    const tag = /[A-Za-z]/.test(first) ? first : "";
    if (tag) cursor += 1;

    if (SIZED_ROW_TAGS.has(tag)) {
      const comma = buffer.indexOf(0x2c /* , */, cursor);
      const hex = comma < 0 ? "" : buffer.toString("latin1", cursor, comma);
      if (/^[0-9a-f]+$/.test(hex)) {
        const start = comma + 1;
        const end = start + parseInt(hex, 16);
        if (end > buffer.length) throw new Error(`row ${id}${tag} runs past the end of the stream`);
        rows.push({ at, id, tag, sized: true, body: buffer.toString("utf8", start, end) });
        at = end;
        continue;
      }
    }

    const newline = buffer.indexOf(0x0a /* \n */, cursor);
    const end = newline < 0 ? buffer.length : newline;
    rows.push({
      at,
      id,
      tag,
      sized: false,
      body: buffer.toString("utf8", cursor, end),
      // The last row of a stream can be left open; re-adding a newline it never
      // had would shift every byte offset a client counted.
      unterminated: newline < 0,
    });
    at = end + 1;
  }
  return rows;
}

function emitFlightRow(row) {
  if (row.sized) {
    const size = Buffer.byteLength(row.body, "utf8").toString(16);
    return `${row.id}:${row.tag}${size},${row.body}`;
  }
  return `${row.id}:${row.tag}${row.body}${row.unterminated ? "" : "\n"}`;
}

/**
 * Rewrite a flight stream, re-counting the rows that declare a length.
 *
 * The parse is checked by re-emitting it untouched first: if that does not come
 * back byte-identical, this does not understand the format Next just wrote and
 * the export is left alone rather than quietly mangled.
 */
function rewriteFlightStream(stream, replace) {
  const rows = parseFlightRows(Buffer.from(stream, "utf8"));
  if (rows.map(emitFlightRow).join("") !== stream) {
    throw new Error("re-emitting the RSC payload unchanged did not reproduce it byte for byte");
  }
  return rows.map((row) => emitFlightRow({ ...row, body: replace(row.body) })).join("");
}

/**
 * A .txt sibling is the same stream with no <script> wrapper around it.
 * Anything else that happens to end in .txt is ordinary text: rewrite it
 * directly, but only once it is clear it holds no length-prefixed row to get
 * wrong.
 */
function rewriteTextFile(text, replace) {
  try {
    return rewriteFlightStream(text, replace);
  } catch (error) {
    if (/(?:^|\n)[0-9a-f]*:[TAOoUSsLlGgMmV][0-9a-f]+,/.test(text)) throw error;
    return replace(text);
  }
}

/** The escaping Next uses for the payload it inlines into a <script>. */
function encodeFlightChunk(value) {
  return JSON.stringify(value)
    .replaceAll("<", "\\u003c")
    .replaceAll(">", "\\u003e")
    .replaceAll("&", "\\u0026")
    .replaceAll("\u2028", "\\u2028")
    .replaceAll("\u2029", "\\u2029");
}

/**
 * Rewrite a page. The inlined payload is handled as one stream even though it
 * arrives in several <script> tags -- a row can straddle two of them -- and each
 * rewritten row goes back into the tag it started in, so the document keeps its
 * shape.
 */
function rewriteHtml(html, replace) {
  PUSH_PATTERN.lastIndex = 0;
  const chunks = [...html.matchAll(PUSH_PATTERN)].map((match) => JSON.parse(match[1]));
  if (chunks.length === 0) return replace(html);

  const rows = parseFlightRows(Buffer.from(chunks.join(""), "utf8"));
  if (rows.map(emitFlightRow).join("") !== chunks.join("")) {
    throw new Error("re-emitting the RSC payload unchanged did not reproduce it byte for byte");
  }

  const starts = [];
  let offset = 0;
  for (const chunk of chunks) {
    starts.push(offset);
    offset += Buffer.byteLength(chunk, "utf8");
  }

  const rewritten = chunks.map(() => "");
  for (const row of rows) {
    let index = 0;
    while (index + 1 < starts.length && starts[index + 1] <= row.at) index += 1;
    rewritten[index] += emitFlightRow({ ...row, body: replace(row.body) });
  }

  let next = 0;
  PUSH_PATTERN.lastIndex = 0;
  const withPayload = html.replace(
    PUSH_PATTERN,
    () => `self.__next_f.push([1,${encodeFlightChunk(rewritten[next++])}])`
  );

  // The markup around the payload is ordinary text, and by now the payload holds
  // no CMS URL for this pass to find.
  return replace(withPayload);
}

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

/**
 * Restore absolute URLs for the consumers that cannot resolve a relative one:
 * og:image / twitter:image, which social scrapers read straight out of the
 * <head>, and JSON-LD, where schema.org expects a resolvable URL.
 *
 * Everything else -- <img src>, srcset, preload hints -- stays root-relative so
 * the export is portable between staging and production.
 */
function absolutiseForCrawlers(html) {
  const withMeta = html.replace(/<meta\b[^>]*>/gi, (tag) =>
    tag.replace(
      new RegExp(`content="(${LOCAL_DIR}/[^"]+)"`, "i"),
      (_m, url) => `content="${SITE_URL}${url}"`
    )
  );

  return withMeta.replace(
    /<script\b[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi,
    (block) => block.replaceAll(`"${LOCAL_DIR}/`, `"${SITE_URL}${LOCAL_DIR}/`)
  );
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

  // Root-relative everywhere. An absolute URL would name the production host,
  // and the same export also gets deployed to staging -- there every image
  // would become a cross-origin request to a site that does not have these
  // files, which Chrome kills as ERR_BLOCKED_BY_ORB.
  //
  // This has to be blind to context. Only the HTML writes the URL as a
  // `src="..."` attribute; the RSC payload carries it as a JSON string, and
  // matching the attribute form alone left every client-side navigation
  // pointing at the wrong host while a full reload looked fine.
  const toLocal = (value) => {
    let next = value;
    for (const [url, name] of mapping) {
      next = next.replaceAll(url, `${LOCAL_DIR}/${name}`);
    }
    return next;
  };

  let rewritten = 0;
  for (const [file, text] of sources) {
    // Then put back the absolute form in the two places that require it. Both
    // are read by crawlers off the served HTML, which have no page context to
    // resolve a relative path against.
    const next = /\.html$/i.test(file)
      ? absolutiseForCrawlers(rewriteHtml(text, toLocal))
      : rewriteTextFile(text, toLocal);

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
