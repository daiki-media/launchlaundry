import PageHero from "@/components/layout/PageHero";
import SectionBadge from "@/components/ui/SectionBadge";
import CtaBanner from "@/components/ui/CtaBanner";
import JsonLd, { SITE_URL, breadcrumbSchema } from "@/components/seo/JsonLd";
import BlogCard from "./BlogCard";
import Pagination from "./Pagination";
import { blogListingSchema } from "@/lib/blogSchema";
import { blogPagePath } from "@/lib/blog";

/**
 * One page of the archive. Shared by /blog (page 1) and /blog/page/[page], so
 * both routes stay identical apart from the slice of posts and the canonical.
 */
export default function BlogArchive({ posts, page, totalPages, total, from, to }) {
  const breadcrumb = [
    { label: "Launch Laundry", href: "/" },
    ...(page === 1
      ? [{ label: "Blog" }]
      : [{ label: "Blog", href: "/blog" }, { label: `Page ${page}` }]),
  ];

  return (
    <>
      <JsonLd
        schemas={[breadcrumbSchema(breadcrumb), blogListingSchema({ posts, page })]}
      />

      {/* React hoists these into <head>. Google ignores rel=prev/next now, but
          Bing and other crawlers still use them to read the series in order. */}
      {page > 1 && <link rel="prev" href={`${SITE_URL}${blogPagePath(page - 1)}`} />}
      {page < totalPages && <link rel="next" href={`${SITE_URL}${blogPagePath(page + 1)}`} />}

      <PageHero
        title={page === 1 ? "Laundry Business Insights & Equipment Guides" : `Blog — Page ${page}`}
        breadcrumb={breadcrumb}
      />

      <section aria-label="Blog articles" className="bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          {page === 1 && (
            <div className="max-w-2xl">
              <SectionBadge>From the team</SectionBadge>
              <p className="mt-6 text-sm leading-relaxed text-body sm:text-base">
                Practical guides on commercial washers and dryers, genuine spare parts,
                maintenance and the numbers behind a profitable laundromat in Malaysia —
                written by the team that installs and services the machines.
              </p>
            </div>
          )}

          <p className="mt-8 text-sm text-slate-500">
            Showing <strong className="font-semibold text-navy">{from}–{to}</strong> of{" "}
            <strong className="font-semibold text-navy">{total}</strong> articles
          </p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <BlogCard key={post.slug} post={post} priority={page === 1 && i < 3} />
            ))}
          </div>

          <Pagination page={page} totalPages={totalPages} />
        </div>
      </section>

      <CtaBanner
        variant="light"
        title="Planning your laundromat? Let's talk numbers."
        description="Tell us about your site and budget — we will map the equipment, layout and setup costs for you."
        button={{ label: "Get a Free Quote", href: "/contact-us" }}
      />
    </>
  );
}
