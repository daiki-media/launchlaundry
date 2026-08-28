import Hero from "@/components/home/Hero";
import FeatureCards from "@/components/home/FeatureCards";
import AboutTabs from "@/components/home/AboutTabs";
import ServicesTabs from "@/components/home/ServicesTabs";
import ProvenApproach from "@/components/home/ProvenApproach";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import FaqSection from "@/components/home/FaqSection";
import SpareParts from "@/components/home/SpareParts";
import CtaBanner from "@/components/ui/CtaBanner";
import JsonLd, { SITE_URL } from "@/components/seo/JsonLd";
import { ctas, faq } from "@/data/home";

// Organization + WebSite schema is emitted site-wide from the root layout.
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}#webpage`,
  url: `${SITE_URL}/`,
  name: "Commercial Laundry Machines & Setup Services Malaysia | Launch Laundry",
  isPartOf: { "@id": `${SITE_URL}#website` },
  about: { "@id": `${SITE_URL}#organization` },
  inLanguage: "en-MY",
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: `${SITE_URL}/images/hero-laundromat.webp`,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}#faq`,
  isPartOf: { "@id": `${SITE_URL}#webpage` },
  mainEntity: faq.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function Home() {
  return (
    <>
      <JsonLd schemas={[webPageSchema, faqSchema]} />

      <Hero />
      <FeatureCards />
      <CtaBanner variant="light" {...ctas.equipment} />
      <AboutTabs />
      <ServicesTabs />
      <ProvenApproach />
      <CtaBanner {...ctas.consultation} />
      <WhyChooseUs />
      <CtaBanner {...ctas.experts} />
      <FaqSection />
      <SpareParts />
      <CtaBanner {...ctas.spareParts} />
    </>
  );
}
