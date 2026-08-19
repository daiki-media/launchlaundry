import Link from "next/link";
import BlogCard from "./BlogCard";

/**
 * Further reading at the foot of an article — same category first (see
 * getRelatedPosts). Its job is internal linking: every post ends with three
 * crawlable routes into the rest of the archive instead of a dead end.
 */
export default function RelatedPosts({ posts }) {
  if (!posts?.length) return null;

  return (
    <section aria-labelledby="related-heading" className="bg-slate-50/60">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="related-heading" className="text-2xl font-bold text-navy sm:text-3xl">
              Keep reading
            </h2>
            <p className="mt-2 text-sm text-body">
              More guides on running a profitable laundry business in Malaysia.
            </p>
          </div>
          <Link
            href="/blog"
            className="text-sm font-semibold text-brand transition hover:text-brand-dark"
          >
            View all articles <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
