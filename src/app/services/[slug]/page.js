import { notFound } from "next/navigation";
import PageHero from "@/components/layout/PageHero";
import ProductIntro from "@/components/products/ProductIntro";
import IconCards from "@/components/products/IconCards";
import FeatureCards from "@/components/products/FeatureCards";
import HighlightBlock from "@/components/products/HighlightBlock";
import ServiceProse from "@/components/services/ServiceProse";
import ServiceCallout from "@/components/services/ServiceCallout";
import PricingPackages from "@/components/services/PricingPackages";
import FaqAccordion from "@/components/locations/FaqAccordion";
import JsonLd, { SITE_URL, breadcrumbSchema } from "@/components/seo/JsonLd";
import { servicePages } from "@/data/services";

export function generateStaticParams() {
  return Object.keys(servicePages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = servicePages[slug];
  if (!page) return {};

  return {
    title: page.meta.title,
    description: page.meta.description,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/services/${slug}`,
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

// Service pages reuse the product-page section renderers so the styling stays
// identical across the site.
const RENDERERS = {
  intro: ProductIntro,
  cards: IconCards,
  featureCards: FeatureCards,
  highlight: HighlightBlock,
  prose: ServiceProse,
  callout: ServiceCallout,
  pricing: PricingPackages,
  faq: FaqAccordion,
};

// Section types that alternate their background tint.
const TINTABLE = new Set(["highlight", "prose", "pricing", "faq"]);

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const page = servicePages[slug];
  if (!page) notFound();

  const breadcrumb = [
    { label: "Launch Laundry", href: "/" },
    { label: "Service", href: "/service" },
    { label: page.name },
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/services/${slug}#service`,
    name: page.name,
    description: page.meta.description,
    serviceType: page.name,
    url: `${SITE_URL}/services/${slug}`,
    image: `${SITE_URL}${page.image}`,
    provider: { "@id": `${SITE_URL}#organization` },
    areaServed: { "@type": "Country", name: "Malaysia" },
  };

  // Pages that carry an FAQ get FAQPage schema too.
  const faqBlock = page.sections.find((section) => section.type === "faq");
  const faqSchema = faqBlock && {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/services/${slug}#faq`,
    mainEntity: faqBlock.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  let tintIndex = 0;

  return (
    <>
      <JsonLd schemas={[breadcrumbSchema(breadcrumb), serviceSchema, faqSchema]} />
      <PageHero title={page.name} breadcrumb={breadcrumb} />

      {page.sections.map((section, i) => {
        const Renderer = RENDERERS[section.type];
        if (!Renderer) return null;
        const props = { section };
        if (TINTABLE.has(section.type)) {
          props.tinted = tintIndex++ % 2 === 1;
        }
        return <Renderer key={`${section.type}-${i}`} {...props} />;
      })}
    </>
  );
}
