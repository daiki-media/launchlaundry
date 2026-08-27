/**
 * HTML helpers for the CMS content that powers the blog. The filename is
 * historical — the archive was written in WordPress and migrated across, so the
 * markup is unchanged: entities to decode, cross-domain links to pull onto this
 * site, empty headings to drop, anchors to add for the table of contents.
 *
 * Plain string work on purpose. Build time only, so no parser dependency.
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
 * Some migrated titles are double-encoded, so run the pass twice to settle.
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
 * Prepare one post table for the shared `.data-table` styling.
 *
 * On a phone the CSS drops the header row and lays each body row out as a card,
 * which needs every cell to carry its column name — so this stamps a
 * `data-label` onto each `<td>` at build time. Two header shapes appear in the
 * archive: a real `<thead>`/`<th>` (most posts) and a first row of bolded
 * `<td>`s (the rest), which is promoted to `<th scope="col">` here.
 *
 * The table's own structure is left alone — cells are edited in place rather
 * than rebuilt, so nothing else in the markup can be lost.
 */
function enhanceTable(table) {
  const CELL = /<(t[dh])\b([^>]*)>([\s\S]*?)<\/\1>/gi;
  const rows = table.match(/<tr\b[^>]*>[\s\S]*?<\/tr>/gi) || [];
  if (!rows.length) return `<div class="data-table-wrap">${table}</div>`;

  const firstCells = [...rows[0].matchAll(CELL)];
  const columns = firstCells.length;

  const alreadyHeader = firstCells.every((c) => c[1].toLowerCase() === "th");
  // A row of bolded cells is a header the editor never marked up as one.
  const boldHeader =
    !alreadyHeader &&
    firstCells.length > 1 &&
    firstCells.every((c) => !stripTags(c[3]) || /<(b|strong)\b/i.test(c[3]));

  const isHeader = alreadyHeader || boldHeader;
  const labels = isHeader ? firstCells.map((c) => stripTags(c[3])) : [];

  let rowIndex = 0;
  let out = table.replace(/<tr\b([^>]*)>([\s\S]*?)<\/tr>/gi, (match, trAttrs, inner) => {
    const headerRow = isHeader && rowIndex === 0;
    rowIndex += 1;

    let cellIndex = 0;
    const body = inner.replace(CELL, (cellMatch, tag, attrs, content) => {
      const index = cellIndex++;
      const clean = attrs.replace(/\s*(?:data-label|scope)="[^"]*"/gi, "");

      if (headerRow) return `<th${clean} scope="col">${content}</th>`;
      if (!labels.length || tag.toLowerCase() === "th") return cellMatch;

      return `<td${clean} data-label="${escapeAttribute(labels[index] || "")}">${content}</td>`;
    });

    return `<tr${trAttrs}>${body}</tr>`;
  });

  const classes = ["data-table"];
  // The promoted header sits in <tbody>, so the CSS needs telling which row to
  // hide on mobile.
  if (boldHeader) classes.push("data-table--head-first");
  // A single column is a list, not a grid — it gets no card treatment.
  if (columns < 2) classes.push("data-table--plain");

  out = out.replace(/^<table\b([^>]*)>/i, (match, attrs) => {
    const existing = attrs.match(/\sclass="([^"]*)"/i)?.[1] || "";
    const rest = attrs.replace(/\s*class="[^"]*"/i, "");
    return `<table${rest} class="${[...classes, existing].filter(Boolean).join(" ")}">`;
  });

  return `<div class="data-table-wrap">${out}</div>`;
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

  // 7. Give every table the shared `.data-table` treatment (see globals.css),
  //    which turns each row into a card on narrow screens.
  out = out.replace(/<table\b[\s\S]*?<\/table>/gi, (table) => enhanceTable(table));

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

/** Rounded reading time in minutes, at the usual 200 wpm reading speed. */
export function readingTime(html) {
  const words = stripTags(html).split(/\s+/).filter(Boolean).length;
  return { words, minutes: Math.max(1, Math.round(words / 200)) };
}
