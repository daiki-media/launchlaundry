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
          // JSON.stringify does not escape `<`, so a "</script>" inside any
          // string would close this tag early. Blog schema carries editor copy
          // from the CMS, so escape it to its unicode form as Next.js recommends.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}

export const SITE_URL = "https://launchlaundry.com.my";

/**
 * `id` must be passed on any page whose WebPage node points at
 * `<url>#breadcrumb` — without it the reference dangles and Google reports a
 * second, empty BreadcrumbList with no itemListElement.
 */
export function breadcrumbSchema(trail, id) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    ...(id ? { "@id": id } : {}),
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.label,
      ...(crumb.href ? { item: `${SITE_URL}${crumb.href === "/" ? "" : crumb.href}` } : {}),
    })),
  };
}
