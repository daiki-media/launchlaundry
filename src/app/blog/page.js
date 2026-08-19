import BlogArchive from "@/components/blog/BlogArchive";
import { SITE_URL } from "@/components/seo/JsonLd";
import { getPostsPage } from "@/lib/blog";

const TITLE = "Laundry Business Blog Malaysia | Equipment & Laundromat Guides";
const DESCRIPTION =
  "Expert guides on commercial laundry equipment, spare parts, maintenance and laundromat business setup in Malaysia — from the Launch Laundry team.";

export function generateMetadata() {
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: "/blog" },
    openGraph: {
      type: "website",
      locale: "en_MY",
      url: `${SITE_URL}/blog`,
      siteName: "Launch Laundry",
      title: TITLE,
      description: DESCRIPTION,
      images: [{ url: "/images/hero-laundromat.webp" }],
    },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  };
}

export default async function BlogIndexPage() {
  const data = await getPostsPage(1);
  return <BlogArchive {...data} />;
}
