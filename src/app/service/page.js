import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import SectionBadge from "@/components/ui/SectionBadge";
import ReadMorePill from "@/components/ui/ReadMorePill";
import JsonLd, { SITE_URL, breadcrumbSchema } from "@/components/seo/JsonLd";
import { servicesMeta, pageHero, listing, services } from "@/data/services";

export const metadata = {
  title: servicesMeta.title,
  description: servicesMeta.description,
  alternates: { canonical: "/service" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/service`,
    title: servicesMeta.title,
    description: servicesMeta.description,
    images: [{ url: services[0].image }],
  },
  twitter: {
    card: "summary_large_image",
    title: servicesMeta.title,
    description: servicesMeta.description,
  },
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}/service#webpage`,
  url: `${SITE_URL}/service`,
  name: servicesMeta.title,
  description: servicesMeta.description,
  isPartOf: { "@id": `${SITE_URL}#website` },
  breadcrumb: { "@id": `${SITE_URL}/service#breadcrumb` },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: services.length,
    itemListElement: services.map((service, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: service.name,
      url: `${SITE_URL}/services/${service.slug}`,
    })),
  },
};

export default function ServiceIndexPage() {
  return (
    <>
      <JsonLd schemas={[breadcrumbSchema(pageHero.breadcrumb, `${SITE_URL}/service#breadcrumb`), collectionSchema]} />
      <PageHero title={pageHero.title} breadcrumb={pageHero.breadcrumb} />

      <section aria-label="Our services" className="bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <div className="text-center">
            <SectionBadge>{listing.badge}</SectionBadge>
            <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
              {listing.title}
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-body">
              {listing.description}
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex flex-col rounded-2xl bg-white p-5 shadow-[0_1px_3px_rgba(16,24,40,.06)] ring-1 ring-slate-200/70 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="overflow-hidden rounded-xl">
                  <Image
                    src={service.image}
                    alt={service.name}
                    width={520}
                    height={340}
                    className="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 340px"
                  />
                </div>
                <h3 className="mt-5 text-base font-bold leading-snug text-navy">{service.name}</h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-body">
                  {service.description}
                </p>
                <ReadMorePill label="Learn More" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
