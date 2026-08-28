import { notFound } from "next/navigation";
import Link from "next/link";
import PostHeader from "@/components/blog/PostHeader";
import PostBody from "@/components/blog/PostBody";
import TableOfContents from "@/components/blog/TableOfContents";
import RelatedPosts from "@/components/blog/RelatedPosts";
import CtaBanner from "@/components/ui/CtaBanner";
import JsonLd, { SITE_URL, breadcrumbSchema } from "@/components/seo/JsonLd";
import { articleSchema, faqSchema } from "@/lib/blogSchema";
import { formatDate, getPost, getPostSlugs, getRelatedPosts, postPath } from "@/lib/blog";

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const url = `${SITE_URL}${postPath(slug)}`;
  const images = post.image ? [{ url: post.image, alt: post.imageAlt }] : undefined;

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    // Canonical points here, not at the CMS copy — this is the version we
    // want indexed.
    alternates: { canonical: postPath(slug) },
    authors: [{ name: post.author }],
    openGraph: {
      type: "article",
      locale: "en_MY",
      url,
      siteName: "Launch Laundry",
      title: post.metaTitle,
      description: post.metaDescription,
      publishedTime: post.date,
      modifiedTime: post.modified || post.date,
      authors: [post.author],
      section: post.category.name,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(post, 3);
  const breadcrumb = [
    { label: "Launch Laundry", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: post.title },
  ];

  return (
    <>
      <JsonLd schemas={[
          breadcrumbSchema(breadcrumb, `${SITE_URL}${postPath(slug)}#breadcrumb`),
          articleSchema(post),
          faqSchema(post),
        ]} />

      <PostHeader post={post} breadcrumb={breadcrumb} />

      <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-14">
          <article>
            <PostBody html={post.html} />

            <footer className="mt-12 border-t border-slate-200 pt-6">
              <p className="text-sm text-slate-500">
                Last updated{" "}
                <time dateTime={post.modified || post.date}>
                  {formatDate(post.modified || post.date)}
                </time>{" "}
                by <span className="font-semibold text-navy">{post.author}</span>.
              </p>
              <Link
                href="/blog"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:text-brand-dark"
              >
                <span aria-hidden="true">←</span> Back to all articles
              </Link>
            </footer>
          </article>

          <aside className="lg:order-last">
            <TableOfContents headings={post.headings} />
          </aside>
        </div>
      </div>

      <CtaBanner
        title="Need the right machines for your laundromat?"
        description="Launch Laundry supplies, installs and services commercial washers, dryers and genuine spare parts across Malaysia."
        button={{ label: "Talk to our team", href: "/contact-us" }}
      />

      <RelatedPosts posts={related} />
    </>
  );
}
