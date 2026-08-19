import Link from "next/link";
import { blogPagePath } from "@/lib/blog";

/**
 * Numbered pager for the blog archive.
 *
 * Every page is a real, crawlable URL (/blog, /blog/page/2 …) rather than a
 * query string, because the static export has no server to interpret one and
 * because each page then earns its own entry in the sitemap.
 *
 * The window collapses to first / last / neighbours with ellipses so 16 pages
 * stay usable on a phone.
 */
function pageWindow(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = new Set([1, total, current, current - 1, current + 1]);
  if (current <= 3) [2, 3, 4].forEach((n) => pages.add(n));
  if (current >= total - 2) [total - 3, total - 2, total - 1].forEach((n) => pages.add(n));

  const sorted = [...pages].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);

  return sorted.flatMap((page, i) =>
    i > 0 && page - sorted[i - 1] > 1 ? ["gap", page] : [page]
  );
}

const linkClass =
  "inline-flex h-10 min-w-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-navy transition hover:border-brand/40 hover:text-brand";

export default function Pagination({ page, totalPages }) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Blog pagination" className="mt-12 flex flex-col items-center gap-4">
      <ul className="flex flex-wrap items-center justify-center gap-2">
        <li>
          {page > 1 ? (
            <Link href={blogPagePath(page - 1)} rel="prev" className={linkClass}>
              <span aria-hidden="true">←</span>
              <span className="ml-2 hidden sm:inline">Previous</span>
              <span className="sr-only">Previous page</span>
            </Link>
          ) : (
            <span className={`${linkClass} cursor-not-allowed opacity-40`} aria-hidden="true">
              <span>←</span>
              <span className="ml-2 hidden sm:inline">Previous</span>
            </span>
          )}
        </li>

        {pageWindow(page, totalPages).map((entry, i) =>
          entry === "gap" ? (
            <li key={`gap-${i}`} aria-hidden="true" className="px-1 text-slate-400">
              …
            </li>
          ) : entry === page ? (
            <li key={entry}>
              <span
                aria-current="page"
                className="inline-flex h-10 min-w-10 items-center justify-center rounded-lg bg-brand px-3 text-sm font-semibold text-white shadow-lg shadow-brand/25"
              >
                {entry}
              </span>
            </li>
          ) : (
            <li key={entry}>
              <Link
                href={blogPagePath(entry)}
                className={linkClass}
                aria-label={`Go to page ${entry}`}
              >
                {entry}
              </Link>
            </li>
          )
        )}

        <li>
          {page < totalPages ? (
            <Link href={blogPagePath(page + 1)} rel="next" className={linkClass}>
              <span className="mr-2 hidden sm:inline">Next</span>
              <span aria-hidden="true">→</span>
              <span className="sr-only">Next page</span>
            </Link>
          ) : (
            <span className={`${linkClass} cursor-not-allowed opacity-40`} aria-hidden="true">
              <span className="mr-2 hidden sm:inline">Next</span>
              <span>→</span>
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}
