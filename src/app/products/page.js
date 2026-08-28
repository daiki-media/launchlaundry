import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import SectionBadge from "@/components/ui/SectionBadge";
import ReadMorePill from "@/components/ui/ReadMorePill";
import JsonLd, { SITE_URL, breadcrumbSchema } from "@/components/seo/JsonLd";
import { productsMeta, pageHero, listing, products } from "@/data/products";

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
      <PageHero title={pageHero.title} breadcrumb={pageHero.breadcrumb} />

      <section aria-label="Our products" className="bg-white">
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
            {products.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
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
                <h3 className="mt-5 text-base font-bold leading-snug text-navy">{product.name}</h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-body">{product.tagline}</p>
                <ReadMorePill label="Read More" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
