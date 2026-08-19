import { notFound } from "next/navigation";
import PageHero from "@/components/layout/PageHero";
import LocationBlocks from "@/components/locations/LocationBlocks";
import JsonLd, { SITE_URL, breadcrumbSchema } from "@/components/seo/JsonLd";
import { locationPages } from "@/data/locations";

export function generateStaticParams() {
  return Object.keys(locationPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = locationPages[slug];
  if (!page) return {};

  return {
    title: page.meta.title,
    description: page.meta.description,
    alternates: { canonical: `/location/${slug}` },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/location/${slug}`,
      title: page.meta.title,
      description: page.meta.description,
      images: [{ url: page.image }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.meta.title,
      description: page.meta.description,
    },
  };
}

export default async function LocationPage({ params }) {
  const { slug } = await params;
  const page = locationPages[slug];
  if (!page) notFound();

  const breadcrumb = [
    { label: "Launch Laundry", href: "/" },
    { label: "Location", href: "/location" },
    { label: page.name },
  ];

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/location/${slug}#webpage`,
    url: `${SITE_URL}/location/${slug}`,
    name: page.meta.title,
    description: page.meta.description,
    isPartOf: { "@id": `${SITE_URL}#website` },
    about: { "@id": `${SITE_URL}#organization` },
    primaryImageOfPage: `${SITE_URL}${page.image}`,
  };

  // The Melaka and Sabah/Sarawak guides carry FAQ sections — expose them for rich results.
  const faqBlock = page.blocks.find((block) => block.type === "faq");
  const faqSchema = faqBlock && {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/location/${slug}#faq`,
    mainEntity: faqBlock.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <JsonLd schemas={[breadcrumbSchema(breadcrumb), webPageSchema, faqSchema]} />
      <PageHero title={page.name} breadcrumb={breadcrumb} />
      <LocationBlocks blocks={page.blocks} />
    </>
  );
}
