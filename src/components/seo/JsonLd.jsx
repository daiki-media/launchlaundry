/**
 * Renders one or more JSON-LD schema objects into the page.
 * Server component — the markup ships in the static HTML, which is what
 * search engines read.
 */
export default function JsonLd({ schemas }) {
  const list = Array.isArray(schemas) ? schemas : [schemas];
  return (
    <>
      {list.filter(Boolean).map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

export const SITE_URL = "https://launchlaundry.com.my";

export function breadcrumbSchema(trail) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.label,
      ...(crumb.href ? { item: `${SITE_URL}${crumb.href === "/" ? "" : crumb.href}` } : {}),
    })),
  };
}
