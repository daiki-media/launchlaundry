import PageHero from "@/components/layout/PageHero";
import PolicyBody from "@/components/legal/PolicyBody";
import PolicyContact from "@/components/legal/PolicyContact";
import JsonLd, { SITE_URL, breadcrumbSchema } from "@/components/seo/JsonLd";
import { privacyMeta, pageHero } from "@/data/privacy";

export const metadata = {
  title: privacyMeta.title,
  description: privacyMeta.description,
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/privacy-policy`,
    title: privacyMeta.title,
    description: privacyMeta.description,
  },
  twitter: {
    card: "summary",
    title: privacyMeta.title,
    description: privacyMeta.description,
  },
};

const privacySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/privacy-policy#webpage`,
  url: `${SITE_URL}/privacy-policy`,
  name: privacyMeta.title,
  description: privacyMeta.description,
  isPartOf: { "@id": `${SITE_URL}#website` },
  about: { "@id": `${SITE_URL}#organization` },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd schemas={[breadcrumbSchema(pageHero.breadcrumb), privacySchema]} />
      <PageHero title={pageHero.title} breadcrumb={pageHero.breadcrumb} />
      <PolicyBody />
      <PolicyContact />
    </>
  );
}
