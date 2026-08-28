import PageHero from "@/components/layout/PageHero";
import ContactHero from "@/components/contact/ContactHero";
import ContactDetails from "@/components/contact/ContactDetails";
import HelpBlock from "@/components/contact/HelpBlock";
import ContactForm from "@/components/contact/ContactForm";
import OfficeBar from "@/components/contact/OfficeBar";
import JsonLd, { SITE_URL, breadcrumbSchema } from "@/components/seo/JsonLd";
import { contactMeta, pageHero, officeBar } from "@/data/contact";
import { site } from "@/data/home";

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
  breadcrumb: { "@id": `${SITE_URL}/contact-us#breadcrumb` },
  mainEntity: { "@id": `${SITE_URL}#localbusiness` },
};

// LocalBusiness gives Google the address, hours and phone for local search.
// It is the same company as the Organization node in the root layout, so it
// declares that explicitly (parentOrganization + a shared address) rather than
// standing as a second, unconnected description of the same business.
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}#localbusiness`,
  name: site.name,
  description: site.description,
  url: `${SITE_URL}/`,
  image: { "@id": `${SITE_URL}#logo` },
  logo: { "@id": `${SITE_URL}#logo` },
  telephone: officeBar.phone,
  email: site.email,
  address: { "@type": "PostalAddress", ...site.address },
  parentOrganization: { "@id": `${SITE_URL}#organization` },
  areaServed: { "@type": "Country", name: "Malaysia" },
  currenciesAccepted: "MYR",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
    // Stated explicitly so Google shows "Closed" rather than "hours unknown".
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "00:00",
      closes: "00:00",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: officeBar.phone,
    contactType: "customer service",
    areaServed: "MY",
    availableLanguage: ["en", "ms"],
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd schemas={[breadcrumbSchema(pageHero.breadcrumb, `${SITE_URL}/contact-us#breadcrumb`), contactSchema, localBusinessSchema]} />
      <PageHero title={pageHero.title} breadcrumb={pageHero.breadcrumb} />
      <ContactHero />
      <ContactDetails />
      <HelpBlock />
      <ContactForm />
      <OfficeBar />
    </>
  );
}
