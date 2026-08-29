import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import JsonLd, { SITE_URL } from "@/components/seo/JsonLd";
import { site } from "@/data/home";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://launchlaundry.com.my"),
  title: "Commercial Laundry Machines & Setup Services Malaysia | Launch Laundry",
  description:
    "Starting a laundromat or upgrading your laundry business? Launch Laundry supplies commercial washers, dryers & spare parts across Malaysia, with full setup support.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_MY",
    url: "https://launchlaundry.com.my/",
    siteName: "Launch Laundry",
    title: "Commercial Laundry Machines & Setup Services Malaysia | Launch Laundry",
    description:
      "Starting a laundromat or upgrading your laundry business? Launch Laundry supplies commercial washers, dryers & spare parts across Malaysia, with full setup support.",
    images: [{ url: "/images/hero-laundromat.webp" }],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}#website`,
  url: `${SITE_URL}/`,
  name: site.name,
  description: site.description,
  inLanguage: "en-MY",
  publisher: { "@id": `${SITE_URL}#organization` },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}#organization`,
  name: site.name,
  url: `${SITE_URL}/`,
  description: site.description,
  // Google wants the logo's dimensions and reads it as the knowledge-panel
  // image, so give it the real intrinsic size of public/images/logo.png.
  logo: {
    "@type": "ImageObject",
    "@id": `${SITE_URL}#logo`,
    url: `${SITE_URL}/images/logo.png`,
    contentUrl: `${SITE_URL}/images/logo.png`,
    width: 674,
    height: 929,
    caption: site.name,
  },
  image: { "@id": `${SITE_URL}#logo` },
  email: site.email,
  telephone: site.phone,
  address: { "@type": "PostalAddress", ...site.address },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: site.phone,
    email: site.email,
    contactType: "customer service",
    areaServed: "MY",
    availableLanguage: ["en", "ms"],
  },
  areaServed: { "@type": "Country", name: "Malaysia" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full antialiased`}>
      <head>
        {/* Article hero images — the LCP element on every post — are still
            served from the CMS, so open the connection before the parser
            reaches the <img> rather than paying DNS + TLS on the LCP path. */}
        <link rel="preconnect" href="https://cms.launchlaundry.com.my" crossOrigin="" />
        <link rel="dns-prefetch" href="https://cms.launchlaundry.com.my" />
      </head>
      <body className="min-h-full flex flex-col">
        <JsonLd schemas={[websiteSchema, organizationSchema]} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
