import { notFound } from "next/navigation";
import BlogArchive from "@/components/blog/BlogArchive";
import { SITE_URL } from "@/components/seo/JsonLd";
import { blogPagePath, getPageCount, getPostsPage } from "@/lib/blog";

/**
 * Pages 2..N of the archive. Page 1 lives at /blog, so it is deliberately not
 * generated here — two URLs listing the same posts would be duplicate content.
 */
export const dynamicParams = false;

export async function generateStaticParams() {
  const totalPages = await getPageCount();
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({
    page: String(i + 2),
  }));
}

export async function generateMetadata({ params }) {
  const { page } = await params;
  const number = Number(page);
  const totalPages = await getPageCount();
  if (!Number.isInteger(number) || number < 2 || number > totalPages) return {};

  const title = `Laundry Business Blog Malaysia — Page ${number} of ${totalPages} | Launch Laundry`;
  const description =
    `Page ${number} of the Launch Laundry blog: commercial laundry equipment, ` +
    `spare parts, maintenance and laundromat business guides for Malaysia.`;

  return {
    title,
    description,
    // Each page canonicalises to itself. Pointing them all at /blog would hide
    // the older posts from the index entirely.
    alternates: { canonical: blogPagePath(number) },
    openGraph: {
      type: "website",
      locale: "en_MY",
      url: `${SITE_URL}${blogPagePath(number)}`,
      siteName: "Launch Laundry",
      title,
      description,
      images: [{ url: "/images/hero-laundromat.webp" }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function BlogPaginatedPage({ params }) {
  const { page } = await params;
  const number = Number(page);
  const totalPages = await getPageCount();

  if (!Number.isInteger(number) || number < 2 || number > totalPages) notFound();

  const data = await getPostsPage(number);
  return <BlogArchive {...data} />;
}
