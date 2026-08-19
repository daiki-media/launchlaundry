import Link from "next/link";
import ReadMorePill from "@/components/ui/ReadMorePill";
import { formatDate, postPath } from "@/lib/blog";

/**
 * One article in the blog grid.
 *
 * The whole card is a single link wrapping the heading, so the anchor text
 * search engines see is the post title rather than a bare "Read More".
 */
export default function BlogCard({ post, priority = false }) {
  const href = postPath(post.slug);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_1px_3px_rgba(16,24,40,.06)] ring-1 ring-slate-200/70 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="aspect-[16/10] overflow-hidden bg-slate-100">
        {post.image ? (
          // Plain <img> on purpose: these are remote WordPress uploads of
          // unknown dimensions, and next.config.mjs sets images.unoptimized
          // for the static export, so next/image would add the width/height
          // requirement without optimising anything.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.image}
            alt={post.imageAlt}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={priority ? "high" : "auto"}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-50 to-emerald-50 text-sm font-semibold text-brand">
            Launch Laundry
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-wider text-brand">
          <span>{post.category.name}</span>
          <span aria-hidden="true" className="text-slate-300">
            •
          </span>
          <span className="text-slate-400">{post.minutes} min read</span>
        </div>

        <h2 className="mt-3 text-base font-bold leading-snug text-navy sm:text-lg">
          <Link href={href} className="transition group-hover:text-brand">
            <span className="absolute inset-0" aria-hidden="true" />
            {post.title}
          </Link>
        </h2>

        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-body">{post.excerpt}</p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <time dateTime={post.date} className="text-xs text-slate-400">
            {formatDate(post.date)}
          </time>
          <ReadMorePill label="Read Article" />
        </div>
      </div>
    </article>
  );
}
