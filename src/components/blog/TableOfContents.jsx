/**
 * In-page outline built from the h2/h3 anchors that src/lib/wpHtml.js added to
 * the post body. Plain anchor links — no JavaScript — so it works in the static
 * export and gives Google the jump-link structure it uses for sitelinks.
 */
export default function TableOfContents({ headings }) {
  if (!headings || headings.length < 3) return null;

  return (
    <nav
      aria-labelledby="toc-heading"
      className="rounded-2xl bg-slate-50/80 p-5 ring-1 ring-slate-200/70 lg:sticky lg:top-24"
    >
      <h2
        id="toc-heading"
        className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand"
      >
        On this page
      </h2>
      <ol className="mt-4 space-y-2 text-sm">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? "pl-4" : ""}>
            <a
              href={`#${heading.id}`}
              className="block leading-snug text-body transition hover:text-brand"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
