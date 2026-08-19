/**
 * HTML helpers for the WordPress content that powers the blog.
 *
 * WordPress hands us `content.rendered` — markup written by editors and by the
 * block editor, aimed at the blog subdomain. Before it can go on
 * launchlaundry.com.my it needs cleaning up: entities decoded for metadata,
 * cross-domain links pulled back onto this site, empty headings dropped and
 * anchors added so the table of contents has something to point at.
 *
 * Everything here is plain string work on purpose. It runs at build time only
 * (see src/lib/blog.js), so there is no runtime cost and no parser dependency.
 */

const NAMED_ENTITIES = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  hellip: "…",
  mdash: "—",
  ndash: "–",
  lsquo: "‘",
  rsquo: "’",
  ldquo: "“",
  rdquo: "”",
  laquo: "«",
  raquo: "»",
  trade: "™",
  copy: "©",
  reg: "®",
  deg: "°",
  euro: "€",
  pound: "£",
  middot: "·",
  bull: "•",
  times: "×",
  frac12: "½",
  eacute: "é",
  szlig: "ß",
};

/**
 * Turn `&#038;`, `&amp;` and friends into real characters.
 * WordPress double-encodes some titles, so run the pass twice to settle.
 */
export function decodeEntities(input) {
  if (!input) return "";
  const once = (text) =>
    text
      .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
      .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
      .replace(/&([a-z0-9]+);/gi, (match, name) => NAMED_ENTITIES[name.toLowerCase()] ?? match);
  return once(once(String(input)))
    .replace(/ /g, " ")
    .trim();
}

/** Plain text from a fragment of markup — for meta descriptions and JSON-LD. */
export function stripTags(html) {
  if (!html) return "";
  return decodeEntities(
    String(html)
      .replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, "")
      .replace(/<[^>]+>/g, " ")
  )
    .replace(/\s+/g, " ")
    .trim();
}

/** Clamp to `max` characters on a word boundary, so descriptions never cut mid-word. */
export function clamp(text, max) {
  const clean = String(text || "").replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  const kept = lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut;
  return `${kept.replace(/[,;:.\s]+$/, "")}…`;
}

/** Escape a value being written back into a double-quoted HTML attribute. */
export function escapeAttribute(value) {
  return String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

/** Stable, URL-safe anchor for a heading. */
export function slugifyHeading(text) {
  return stripTags(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60)
    .replace(/^-+|-+$/g, "");
}

/**
 * Split any launchlaundry URL — blog subdomain included — into the path plus
 * whatever trails it. Blog permalinks are top level here, exactly as they are
 * there. Returns null when the URL points somewhere we do not host.
 */
export function internalPath(href) {
  let url;
  try {
    url = new URL(href, "https://launchlaundry.com.my");
  } catch {
    return null;
  }
  if (!/^(?:blog\.)?launchlaundry\.com\.my$/i.test(url.hostname)) return null;

  let path;
  try {
    path = decodeURIComponent(url.pathname);
  } catch {
    path = url.pathname;
  }
  path = path.replace(/\/+$/, "") || "/";

  // Blog taxonomy archives have no counterpart here — send them to the index.
  if (/^\/(category|tag|author)\//.test(path)) return { path: "/blog", suffix: "" };

  return { path, suffix: url.search + url.hash };
}

/**
 * Clean up a post body for rendering on this site.
 *
 * Returns the rewritten HTML plus the h2/h3 outline used by the table of
 * contents, so the anchors in both always agree.
 */
export function transformContent(html, resolvePath = (path) => path) {
  if (!html) return { html: "", headings: [] };

  let out = String(html);

  // 1. Drop the block editor's spacer headings. An empty <h2> is a real SEO
  //    defect, and there are a few dozen of them across the archive.
  out = out.replace(
    /<h([1-6])\b[^>]*>(?:\s|&nbsp;|<br\s*\/?>|<\/?(?:span|strong|b|em|i|p)\b[^>]*>)*<\/h\1>/gi,
    ""
  );

  // 2. Same for the &nbsp;-only paragraphs the editors used as spacers. The
  //    `.post-body` rules handle vertical rhythm, so these only add odd gaps.
  out = out.replace(
    /<p\b[^>]*>(?:\s|&nbsp;|<br\s*\/?>|<\/?(?:span|strong|b|em|i)\b[^>]*>)*<\/p>/gi,
    ""
  );

  // 3. The page renders the post title as the h1, so a second h1 in the body
  //    would compete with it. Demote it.
  out = out.replace(/<(\/?)h1\b/gi, "<$1h2");

  // 4. `<span style="font-weight: 400;">` is Google Docs paste residue wrapping
  //    plain text. Unwrap the leaf spans; anything nested is left alone.
  let previous;
  do {
    previous = out;
    out = out.replace(/<span style="font-weight: 400;">([^<]*)<\/span>/gi, "$1");
  } while (out !== previous);

  // 5. Point every launchlaundry link at a page this site really builds, and
  //    make outbound links safe. `resolvePath` is supplied by src/lib/blog.js,
  //    which is the only place that knows the full route list.
  out = out.replace(/<a\b([^>]*?)href="([^"]*)"([^>]*)>/gi, (match, before, href, after) => {
    const attrs = `${before}${after}`.replace(/\s*(?:target|rel)="[^"]*"/gi, "").trimEnd();
    const internal = internalPath(href);
    if (internal) {
      const resolved = resolvePath(internal.path);
      // A corrected path drops the old fragment: it no longer points anywhere.
      const suffix = resolved === internal.path ? internal.suffix : "";
      return `<a${attrs} href="${escapeAttribute(resolved + suffix)}">`;
    }
    if (/^https?:/i.test(href)) {
      return `<a${attrs} href="${href}" target="_blank" rel="noopener noreferrer">`;
    }
    return match;
  });

  // 6. Images: lazy by default, always with an alt attribute so the markup validates.
  out = out.replace(/<img\b([^>]*?)\s*\/?>/gi, (match, attrs) => {
    let next = attrs.trimEnd();
    if (!/\balt=/i.test(next)) next += ' alt=""';
    if (!/\bloading=/i.test(next)) next += ' loading="lazy"';
    if (!/\bdecoding=/i.test(next)) next += ' decoding="async"';
    return `<img ${next.trim()} />`;
  });

  // 7. Wide spec tables need to scroll rather than stretch the page on mobile.
  out = out.replace(
    /<table\b[\s\S]*?<\/table>/gi,
    (table) => `<div class="wp-table">${table}</div>`
  );

  // 8. Anchor every h2/h3 so the table of contents can link into the article.
  const headings = [];
  const used = new Set();
  out = out.replace(/<h([23])\b([^>]*)>([\s\S]*?)<\/h\1>/gi, (match, level, attrs, inner) => {
    const text = stripTags(inner);
    if (!text) return match;

    const base = slugifyHeading(text) || `section-${headings.length + 1}`;
    let id = base;
    let n = 2;
    while (used.has(id)) id = `${base}-${n++}`;
    used.add(id);

    headings.push({ id, text, level: Number(level) });
    const cleaned = attrs.replace(/\s*id="[^"]*"/gi, "");
    return `<h${level}${cleaned} id="${id}">${inner}</h${level}>`;
  });

  return { html: out.trim(), headings };
}

/**
 * Pull the question/answer pairs out of a post's FAQ section for FAQPage
 * structured data. Two shapes appear in the archive:
 *   a) <p><strong>Question?</strong></p><p>Answer</p>   (the common one)
 *   b) <h3>Question?</h3><p>Answer</p>
 * The section stays in the body as written — this only mirrors it into schema.
 */
export function extractFaqs(html) {
  if (!html) return [];

  const source = String(html);
  const start = source.search(
    /<h[2-4]\b[^>]*>(?:(?!<\/h[2-4]>)[\s\S])*?(?:Frequently\s+Asked\s+Questions|\bFAQs?\b)/i
  );
  if (start < 0) return [];

  const section = source.slice(start);
  const faqs = [];
  const seen = new Set();

  const push = (question, answer) => {
    const q = stripTags(question);
    const a = stripTags(answer);
    // Real questions only: long enough to be a sentence, short enough to be a heading.
    if (q.length < 12 || q.length > 300 || a.length < 25) return;
    if (
      !/\?$/.test(q) &&
      !/^(what|how|why|when|where|who|which|can|do|does|is|are|should|will)\b/i.test(q)
    ) {
      return;
    }
    const key = q.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    faqs.push({ question: q, answer: clamp(a, 900) });
  };

  // Shape (a): a bolded paragraph followed by one or more plain paragraphs.
  const bolded =
    /<p\b[^>]*>\s*(?:<(?:strong|b)>\s*)+([\s\S]*?)(?:\s*<\/(?:strong|b)>\s*)+<\/p>\s*((?:<p\b(?![^>]*>\s*<(?:strong|b)>)[^>]*>[\s\S]*?<\/p>\s*)+)/gi;
  for (const match of section.matchAll(bolded)) push(match[1], match[2]);

  // Shape (b): a sub-heading followed by its answer paragraphs.
  const headed = /<h([34])\b[^>]*>([\s\S]*?)<\/h\1>\s*((?:<p\b[^>]*>[\s\S]*?<\/p>\s*)+)/gi;
  for (const match of section.matchAll(headed)) push(match[2], match[3]);

  return faqs.slice(0, 12);
}

/** Rounded reading time in minutes, at the 200 wpm Yoast reports against. */
export function readingTime(html) {
  const words = stripTags(html).split(/\s+/).filter(Boolean).length;
  return { words, minutes: Math.max(1, Math.round(words / 200)) };
}
