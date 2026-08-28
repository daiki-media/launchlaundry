import PageHero from "@/components/layout/PageHero";
import CaseStudyGrid from "@/components/case-study/CaseStudyGrid";
import JsonLd, { SITE_URL, breadcrumbSchema } from "@/components/seo/JsonLd";
import { caseStudyMeta, pageHero, intro, items } from "@/data/caseStudy";

export const metadata = {
  title: caseStudyMeta.title,
  description: caseStudyMeta.description,
  alternates: { canonical: "/case-study" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/case-study`,
    title: caseStudyMeta.title,
    description: caseStudyMeta.description,
    images: [{ url: "/images/case-study/laundry-shop-interior-view.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: caseStudyMeta.title,
    description: caseStudyMeta.description,
  },
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}/case-study#webpage`,
  url: `${SITE_URL}/case-study`,
  name: caseStudyMeta.title,
  description: caseStudyMeta.description,
  isPartOf: { "@id": `${SITE_URL}#website` },
  breadcrumb: { "@id": `${SITE_URL}/case-study#breadcrumb` },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.title,
      image: `${SITE_URL}${item.image}`,
    })),
  },
};

export default function CaseStudyPage() {
  return (
    <>
      <JsonLd schemas={[breadcrumbSchema(pageHero.breadcrumb, `${SITE_URL}/case-study#breadcrumb`), collectionSchema]} />
      <PageHero title={pageHero.title} breadcrumb={pageHero.breadcrumb} />
      <CaseStudyGrid />
    </>
  );
}
