import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import ReadMorePill from "@/components/ui/ReadMorePill";
import ServiceProse from "@/components/services/ServiceProse";
import ServiceTable from "@/components/services/ServiceTable";
import { Inline } from "@/components/locations/RichBody";
import JsonLd, { SITE_URL, breadcrumbSchema } from "@/components/seo/JsonLd";
import { productsMeta, pageHero, listing, listingSections, products } from "@/data/products";

const RENDERERS = { prose: ServiceProse, table: ServiceTable };

const productBySlug = Object.fromEntries(products.map((product) => [product.slug, product]));

export const metadata = {
  title: productsMeta.title,
  description: productsMeta.description,
  alternates: { canonical: "/products" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/products`,
    title: productsMeta.title,
    description: productsMeta.description,
    images: [{ url: "/images/products/w060f-w2110f.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: productsMeta.title,
    description: productsMeta.description,
  },
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}/products#webpage`,
  url: `${SITE_URL}/products`,
  name: productsMeta.title,
  description: productsMeta.description,
  isPartOf: { "@id": `${SITE_URL}#website` },
  breadcrumb: { "@id": `${SITE_URL}/products#breadcrumb` },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: products.length,
    itemListElement: products.map((product, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: product.name,
      url: `${SITE_URL}/products/${product.slug}`,
    })),
  },
};

export default function ProductsPage() {
  return (
    <>
      <JsonLd schemas={[breadcrumbSchema(pageHero.breadcrumb, `${SITE_URL}/products#breadcrumb`), collectionSchema]} />
      <PageHero title={pageHero.title} intro={pageHero.intro} breadcrumb={pageHero.breadcrumb} />

      <section aria-label={listing.title} className="bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
              {listing.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-body">
              <Inline content={listing.description} />
            </p>
          </div>

          {listing.groups.map((group) => (
            <div key={group.title} className="mt-12">
              <h3 className="text-xl font-bold text-navy sm:text-2xl">{group.title}</h3>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map(({ slug, text }) => {
                  const product = productBySlug[slug];
                  return (
                    <Link
                      key={slug}
                      href={`/products/${slug}`}
                      className="group flex flex-col rounded-2xl bg-white p-5 shadow-[0_1px_3px_rgba(16,24,40,.06)] ring-1 ring-slate-200/70 transition hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="overflow-hidden rounded-xl">
                        <Image
                          src={product.image}
                          alt={product.imageAlt}
                          width={520}
                          height={400}
                          className="h-48 w-full object-contain transition duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 340px"
                        />
                      </div>
                      <h4 className="mt-5 text-base font-bold leading-snug text-navy">{product.name}</h4>
                      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-body">{text}</p>
                      <ReadMorePill label={listing.cardLabel} />
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {listingSections.map((section, i) => {
        const Renderer = RENDERERS[section.type];
        return <Renderer key={section.heading} section={section} tinted={i % 2 === 0} />;
      })}
    </>
  );
}
