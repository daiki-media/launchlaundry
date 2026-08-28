import { notFound } from "next/navigation";
import PageHero from "@/components/layout/PageHero";
import ProductIntro from "@/components/products/ProductIntro";
import SpecTable from "@/components/products/SpecTable";
import IconCards from "@/components/products/IconCards";
import FeatureCards from "@/components/products/FeatureCards";
import PhotoCards from "@/components/products/PhotoCards";
import ServiceLinkCards from "@/components/products/ServiceLinkCards";
import HighlightBlock from "@/components/products/HighlightBlock";
import JsonLd, { SITE_URL, breadcrumbSchema } from "@/components/seo/JsonLd";
import { productPages } from "@/data/products";

export function generateStaticParams() {
  return Object.keys(productPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = productPages[slug];
  if (!product) return {};

  return {
    title: product.meta.title,
    description: product.meta.description,
    alternates: { canonical: `/products/${slug}` },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/products/${slug}`,
      title: product.meta.title,
      description: product.meta.description,
      images: [{ url: product.image }],
    },
    twitter: {
      card: "summary_large_image",
      title: product.meta.title,
      description: product.meta.description,
    },
  };
}

const RENDERERS = {
  intro: ProductIntro,
  table: SpecTable,
  cards: IconCards,
  featureCards: FeatureCards,
  photoCards: PhotoCards,
  serviceLinks: ServiceLinkCards,
  highlight: HighlightBlock,
};

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = productPages[slug];
  if (!product) notFound();

  const breadcrumb = [
    { label: "Launch Laundry", href: "/" },
    { label: "Products", href: "/products" },
    { label: product.name },
  ];

  // Product schema: what the page is actually about, for rich results.
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE_URL}/products/${slug}#product`,
    name: product.name,
    description: product.meta.description,
    image: `${SITE_URL}${product.image}`,
    brand: { "@type": "Brand", name: "LaundryMate" },
    category: "Commercial laundry equipment",
    url: `${SITE_URL}/products/${slug}`,
    manufacturer: { "@id": `${SITE_URL}#organization` },
    mainEntityOfPage: { "@id": `${SITE_URL}/products/${slug}#webpage` },
  };

  // The page the Product lives on. Without this node the breadcrumb below has
  // nothing to hang off and the page is a bare Product floating in the graph.
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/products/${slug}#webpage`,
    url: `${SITE_URL}/products/${slug}`,
    name: product.meta.title,
    description: product.meta.description,
    isPartOf: { "@id": `${SITE_URL}#website` },
    inLanguage: "en-MY",
    primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_URL}${product.image}` },
    breadcrumb: { "@id": `${SITE_URL}/products/${slug}#breadcrumb` },
    mainEntity: { "@id": `${SITE_URL}/products/${slug}#product` },
  };

  // Alternate the background tint on highlight blocks so neighbouring
  // sections stay visually separated.
  let highlightCount = 0;

  return (
    <>
      <JsonLd schemas={[
          breadcrumbSchema(breadcrumb, `${SITE_URL}/products/${slug}#breadcrumb`),
          webPageSchema,
          productSchema,
        ]} />
      <PageHero title={product.name} breadcrumb={breadcrumb} />

      {product.sections.map((section, i) => {
        const Renderer = RENDERERS[section.type];
        if (!Renderer) return null;
        const props = { section };
        if (section.type === "highlight") {
          props.tinted = highlightCount++ % 2 === 1;
        }
        return <Renderer key={`${section.type}-${i}`} {...props} />;
      })}
    </>
  );
}
