import Link from "next/link";
import { formatDate } from "@/lib/blog";

/**
 * Article masthead: breadcrumb, h1, byline and the hero image.
 *
 * Mirrors PageHero's gradient so an article does not look like a different
 * site, but carries the extra author/date/reading-time signals that an
 * editorial page is expected to show.
 */
export default function PostHeader({ post, breadcrumb }) {
  return (
    <header>
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "radial-gradient(60% 100% at 0% 50%, rgba(198,238,216,.75) 0%, rgba(198,238,216,0) 70%)," +
            "radial-gradient(65% 110% at 100% 50%, rgba(224,214,250,.8) 0%, rgba(224,214,250,0) 72%)," +
            "linear-gradient(100deg, #eefaf3 0%, #fbfaff 48%, #f2ecfd 100%)",
        }}
      >
        <div className="mx-auto max-w-4xl px-5 py-12 sm:py-16">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-navy-soft">
              {breadcrumb.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition hover:text-brand">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="line-clamp-1 max-w-[16rem] sm:max-w-md">
                      {crumb.label}
                    </span>
                  )}
                  {i < breadcrumb.length - 1 && (
                    <span aria-hidden="true" className="text-slate-400">
                      &gt;
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.14em] text-brand">
            {post.category.name}
          </p>

          <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-navy sm:text-4xl lg:text-[2.6rem]">
            {post.title}
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-body sm:text-base">
            {post.excerpt}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-navy-soft">
            <span className="font-semibold text-navy">{post.author}</span>
            <span aria-hidden="true" className="text-slate-300">
              •
            </span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true" className="text-slate-300">
              •
            </span>
            <span>{post.minutes} min read</span>
          </div>
        </div>
      </div>

      {post.image && (
        <div className="mx-auto max-w-4xl px-5">
          {/* Remote CMS upload of unknown size, and the static export
              runs with images.unoptimized — see the note in BlogCard.jsx. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            alt={post.imageAlt}
            fetchPriority="high"
            decoding="async"
            className="-mt-6 aspect-[16/9] w-full rounded-2xl object-cover shadow-lg ring-1 ring-slate-200/70 sm:-mt-8"
          />
        </div>
      )}
    </header>
  );
}
