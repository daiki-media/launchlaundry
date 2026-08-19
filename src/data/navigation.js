// Header navigation, derived from the page data so the menus never drift from
// the routes that actually exist.
//
// Shape consumed by src/components/layout/Header.jsx:
//   { label, href, match }                           → plain link
//   { label, href, match, icon, columns, promo }     → mega menu
//   match:   path prefixes that mark this item active (defaults to [href])
//   columns: [{ heading, items: [{ label, href, description }] }]
//   promo:   { title, text, cta: { label, href } }
//
// NOTE: "/laundromat-business" and "/blog" from `nav` in src/data/home.js are
// intentionally absent — neither route exists yet, so they would 404. Add them
// back here once the pages ship.

import { services } from "./services";
import { products } from "./products";
import { locationPages } from "./locations";

// Menus stay readable when the copy is short; the panel clamps to two lines but
// trimming at the source keeps the markup honest.
const shorten = (text, max = 90) => {
  if (!text || text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
};

const serviceItems = services.map((service) => ({
  label: service.name,
  href: `/services/${service.slug}`,
  description: shorten(service.description),
}));

const productItems = products.map((product) => ({
  label: product.name,
  href: `/products/${product.slug}`,
  description: shorten(product.tagline),
}));

// Short, menu-friendly subtitles — the page-level copy is far too long for a dropdown.
const locationBlurbs = {
  "kuala-lumpur": "Capital city — high footfall, fast-paced demand.",
  selangor: "Malaysia’s fastest-growing residential & commercial hub.",
  "johor-bahru": "Southern gateway with strong cross-border traffic.",
  penang: "Island market driven by students, tourism & industry.",
  "laundromat-business-melaka-malaysia-2026": "Tourism-led demand in a compact, growing city.",
  "laundromat-business-sabah-sarawak-2026": "East Malaysia — underserved, high-upside markets.",
};

const locationItems = Object.entries(locationPages).map(([slug, page]) => ({
  label: page.name.replace(/^Laundromat Business in /, ""),
  href: `/location/${slug}`,
  description: locationBlurbs[slug],
}));

// Split a flat list into `count` balanced columns for the desktop mega menu.
const intoColumns = (items, count) => {
  const perColumn = Math.ceil(items.length / count);
  return Array.from({ length: count }, (_, i) => ({
    items: items.slice(i * perColumn, (i + 1) * perColumn),
  }));
};

export const mainNav = [
  { label: "About", href: "/about", match: ["/about"] },
  {
    label: "Services",
    href: "/service",
    // Listing lives at /service, detail pages at /services/<slug>.
    match: ["/service", "/services"],
    icon: "spark",
    columns: intoColumns(serviceItems, 2),
    promo: {
      title: "Not sure where to start?",
      text: "Tell us about your site and budget — we will map the fastest route to an open, profitable laundromat.",
      cta: { label: "Browse all services", href: "/service" },
    },
  },
  {
    label: "Products",
    href: "/products",
    match: ["/products"],
    icon: "box",
    columns: intoColumns(productItems, 2),
    promo: {
      title: "Built for commercial loads",
      text: "Washers, dryers, ironers and spare parts supported nationwide across Malaysia.",
      cta: { label: "View all products", href: "/products" },
    },
  },
  {
    label: "Locations",
    href: "/location",
    match: ["/location"],
    icon: "pin",
    columns: intoColumns(locationItems, 2),
    promo: {
      title: "We cover all of Malaysia",
      text: "Site feasibility, demographics and foot-traffic analysis before you sign a lease.",
      cta: { label: "See every location", href: "/location" },
    },
  },
  { label: "Case Study", href: "/case-study", match: ["/case-study"] },
  { label: "Contact", href: "/contact-us", match: ["/contact-us"] },
];

export const navCta = { label: "Get a Quote", href: "/contact-us" };
