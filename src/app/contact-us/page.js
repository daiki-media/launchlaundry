import PageHero from "@/components/layout/PageHero";
import ContactHero from "@/components/contact/ContactHero";
import ContactDetails from "@/components/contact/ContactDetails";
import HelpBlock from "@/components/contact/HelpBlock";
import ContactForm from "@/components/contact/ContactForm";
import OfficeBar from "@/components/contact/OfficeBar";
import JsonLd, { SITE_URL, breadcrumbSchema } from "@/components/seo/JsonLd";
import { contactMeta, pageHero, details, officeBar } from "@/data/contact";

export const metadata = {
  title: contactMeta.title,
  description: contactMeta.description,
  alternates: { canonical: "/contact-us" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/contact-us`,
    title: contactMeta.title,
    description: contactMeta.description,
    images: [{ url: "/images/contact/industrial-laundry-room.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: contactMeta.title,
    description: contactMeta.description,
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${SITE_URL}/contact-us#webpage`,
  url: `${SITE_URL}/contact-us`,
  name: contactMeta.title,
  description: contactMeta.description,
  isPartOf: { "@id": `${SITE_URL}#website` },
  about: { "@id": `${SITE_URL}#organization` },
};

// LocalBusiness gives Google the address, hours and phone for local search.
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}#localbusiness`,
  name: "Launch Laundry",
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/images/logo.png`,
  telephone: officeBar.phone,
  email: "info@launchlaundry.com.my",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2, Jalan Hang Tuah Bukit Bintang",
    addressLocality: "Kuala Lumpur",
    addressRegion: "Wilayah Persekutuan Kuala Lumpur",
    postalCode: "55100",
    addressCountry: "MY",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  contactPoint: details
    .filter((d) => d.title === "Phone")
    .map(() => ({
      "@type": "ContactPoint",
      telephone: officeBar.phone,
      contactType: "customer service",
      areaServed: "MY",
      availableLanguage: ["en", "ms"],
    })),
};

export default function ContactPage() {
  return (
    <>
      <JsonLd schemas={[breadcrumbSchema(pageHero.breadcrumb), contactSchema, localBusinessSchema]} />
      <PageHero title={pageHero.title} breadcrumb={pageHero.breadcrumb} />
      <ContactHero />
      <ContactDetails />
      <HelpBlock />
      <ContactForm />
      <OfficeBar />
    </>
  );
}
