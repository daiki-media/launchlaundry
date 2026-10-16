import Link from "next/link";

const LINK_CLASS = "font-semibold text-brand underline underline-offset-2 hover:text-brand-dark";

// Inline runs: a plain string, { b } for a bold keyword, or { a, href } for a
// link. Internal paths go through next/link; anything absolute opens in a new tab.
export function Inline({ content }) {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content.map((part, i) => {
      if (typeof part === "string") return part;
      if (part.href) {
        return part.href.startsWith("/") ? (
          <Link key={i} href={part.href} className={LINK_CLASS}>
            {part.a}
          </Link>
        ) : (
          <a key={i} href={part.href} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
            {part.a}
          </a>
        );
      }
      return (
        <strong key={i} className="font-semibold text-navy">
          {part.b}
        </strong>
      );
    });
  }
  return null;
}

/** The same runs as plain text, for structured data. */
export function inlineText(content) {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content.map((part) => (typeof part === "string" ? part : part.a ?? part.b)).join("");
  }
  return "";
}

// A list item is a string, an inline array, or { b, t } for a bold lead-in label.
function ListItem({ item }) {
  if (item && !Array.isArray(item) && typeof item === "object" && "b" in item) {
    return (
      <>
        <strong className="font-semibold text-navy">{item.b}</strong>
        {item.t}
      </>
    );
  }
  return <Inline content={item} />;
}

function itemKey(item, i) {
  if (typeof item === "string") return item;
  if (Array.isArray(item)) return `${i}-${typeof item[0] === "string" ? item[0] : ""}`;
  return item.b ?? String(i);
}

/**
 * Renders the `body` arrays in src/data/locations.js.
 * String or array → paragraph; { h } → subheading; { ul } / { ol } → list;
 * { note, link } → a short "also read" line.
 */
export default function RichBody({ body, className = "" }) {
  return (
    <div className={`space-y-4 ${className}`}>
      {body.map((block, i) => {
        if (typeof block === "string" || Array.isArray(block)) {
          return (
            <p key={i} className="text-sm leading-relaxed text-body sm:text-[15px]">
              <Inline content={block} />
            </p>
          );
        }

        if (block.h) {
          return (
            <h3 key={i} className="pt-2 text-base font-bold text-navy sm:text-lg">
              {block.h}
            </h3>
          );
        }

        if (block.ul || block.ol) {
          const items = block.ul ?? block.ol;
          const Tag = block.ol ? "ol" : "ul";
          return (
            <Tag
              key={i}
              className={`space-y-2.5 text-sm text-body sm:text-[15px] ${
                block.ol ? "list-decimal space-y-3 pl-5 marker:font-semibold marker:text-brand" : ""
              }`}
            >
              {items.map((item, j) =>
                block.ol ? (
                  <li key={itemKey(item, j)} className="pl-1 leading-relaxed">
                    <ListItem item={item} />
                  </li>
                ) : (
                  <li key={itemKey(item, j)} className="flex gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand/60"
                    />
                    <span className="leading-relaxed">
                      <ListItem item={item} />
                    </span>
                  </li>
                )
              )}
            </Tag>
          );
        }

        if (block.link) {
          return (
            <p key={i} className="pt-1 text-sm text-body">
              {block.note}
              <Link href={block.link.href} className={LINK_CLASS}>
                {block.link.label}
              </Link>
            </p>
          );
        }

        return null;
      })}
    </div>
  );
}
