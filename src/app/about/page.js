import PageHero from "@/components/layout/PageHero";
import AboutIntro from "@/components/about/AboutIntro";
import OriginStory from "@/components/about/OriginStory";
import WhatMakesUsDifferent from "@/components/about/WhatMakesUsDifferent";
import PeopleBehind from "@/components/about/PeopleBehind";
import WhyChooseAbout from "@/components/about/WhyChooseAbout";
import ReadyToLaunch from "@/components/about/ReadyToLaunch";
import JsonLd, { SITE_URL, breadcrumbSchema } from "@/components/seo/JsonLd";
import { aboutMeta, pageHero } from "@/data/about";

export const metadata = {
  title: aboutMeta.title,
  description: aboutMeta.description,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/about`,
    title: aboutMeta.title,
    description: aboutMeta.description,
    images: [{ url: "/images/about/innovation-in-the-laundry.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: aboutMeta.title,
    description: aboutMeta.description,
  },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE_URL}/about#webpage`,
  url: `${SITE_URL}/about`,
  name: aboutMeta.title,
  description: aboutMeta.description,
  isPartOf: { "@id": `${SITE_URL}#website` },
  about: { "@id": `${SITE_URL}#organization` },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd schemas={[breadcrumbSchema(pageHero.breadcrumb), aboutSchema]} />
      <PageHero title={pageHero.title} breadcrumb={pageHero.breadcrumb} />
      <AboutIntro />
      <OriginStory />
      <WhatMakesUsDifferent />
      <PeopleBehind />
      <WhyChooseAbout />
      <ReadyToLaunch />
    </>
  );
}
