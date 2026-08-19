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
  icons: {
    icon: [
      { url: "/images/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/images/favicon-192.png",
  },
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

// Site-wide schema. Page-level schema references these by @id.
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}#website`,
  url: `${SITE_URL}/`,
  name: site.name,
  inLanguage: "en-MY",
  publisher: { "@id": `${SITE_URL}#organization` },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}#organization`,
  name: site.name,
  url: `${SITE_URL}/`,
  logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.png` },
  email: site.email,
  telephone: site.phone,
  address: { "@type": "PostalAddress", addressCountry: "MY" },
  areaServed: "MY",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full antialiased`}>
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
