import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import RichBody from "@/components/locations/RichBody";
import ReadMorePill from "@/components/ui/ReadMorePill";
import JsonLd, { SITE_URL, breadcrumbSchema } from "@/components/seo/JsonLd";
import {
  locationsMeta,
  indexHero,
  indexIntro,
  whereWeWork,
  indexWhyChoose,
  indexCta,
  locationPages,
} from "@/data/locations";

export const metadata = {
  title: locationsMeta.title,
  description: locationsMeta.description,
  alternates: { canonical: "/location" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/location`,
    title: locationsMeta.title,
    description: locationsMeta.description,
    images: [{ url: indexIntro.image }],
  },
  twitter: {
    card: "summary_large_image",
    title: locationsMeta.title,
    description: locationsMeta.description,
  },
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}/location#webpage`,
  url: `${SITE_URL}/location`,
  name: locationsMeta.title,
  description: locationsMeta.description,
  isPartOf: { "@id": `${SITE_URL}#website` },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: Object.keys(locationPages).length,
    itemListElement: Object.entries(locationPages).map(([slug, page], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: page.name,
      url: `${SITE_URL}/location/${slug}`,
    })),
  },
};

export default function LocationIndexPage() {
  return (
    <>
      <JsonLd schemas={[breadcrumbSchema(indexHero.breadcrumb), collectionSchema]} />
      <PageHero title={indexHero.title} breadcrumb={indexHero.breadcrumb} />

      <section aria-label="Our locations" className="bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 sm:py-16 lg:grid-cols-2 lg:gap-14">
          <div className="overflow-hidden rounded-2xl shadow-[0_10px_36px_rgba(20,35,70,.10)]">
            <Image
              src={indexIntro.image}
              alt={indexIntro.imageAlt}
              width={720}
              height={520}
              priority
              className="h-auto w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold leading-[1.25] tracking-tight text-navy sm:text-3xl lg:text-4xl">
              {indexIntro.heading}
            </h2>
            <RichBody body={indexIntro.body} className="mt-5" />
          </div>
        </div>
      </section>

      <section aria-label="Where we work" className="bg-violet-50/40">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:py-16">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            {whereWeWork.heading}
          </h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whereWeWork.items.map((item) => {
              const card = (
                <>
                  <h3 className="text-lg font-bold text-navy">{item.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-body">{item.description}</p>
                  {item.href && <ReadMorePill label="Explore" />}
                </>
              );

              return item.href ? (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group flex flex-col rounded-2xl bg-white p-7 shadow-[0_1px_3px_rgba(16,24,40,.06)] ring-1 ring-slate-200/60 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  {card}
                </Link>
              ) : (
                <div
                  key={item.title}
                  className="flex flex-col rounded-2xl bg-white p-7 shadow-[0_1px_3px_rgba(16,24,40,.06)] ring-1 ring-slate-200/60"
                >
                  {card}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section aria-label="Why choose Launch Laundry" className="bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 sm:py-16 lg:grid-cols-2 lg:gap-14">
          <div className="lg:order-2">
            <div className="overflow-hidden rounded-2xl shadow-[0_10px_36px_rgba(20,35,70,.10)]">
              <Image
                src={indexWhyChoose.image}
                alt={indexWhyChoose.imageAlt}
                width={720}
                height={520}
                className="h-auto w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 560px"
              />
            </div>
          </div>
          <div className="lg:order-1">
            <h2 className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
              {indexWhyChoose.heading}
            </h2>
            <RichBody body={indexWhyChoose.body} className="mt-5" />
          </div>
        </div>
      </section>

      <section aria-label="Ready to start your laundromat" className="bg-violet-50/40">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:py-20">
          <h2 className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
            {indexCta.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-body sm:text-[15px]">
            {indexCta.text}
          </p>
          <Link
            href={indexCta.button.href}
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:-translate-y-0.5 hover:bg-brand-dark"
          >
            {indexCta.button.label}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
