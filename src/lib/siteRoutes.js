import { productPages } from "@/data/products";
import { servicePages } from "@/data/services";
import { locationPages } from "@/data/locations";

/**
 * Every non-blog path this site actually builds.
 *
 * The blog copy was written against the WordPress subdomain and links to
 * pages using slugs that never existed here ("/contact", "/locations",
 * "/services/finance-advisory"). src/lib/blog.js checks each rewritten link
 * against this set so a stale link in a post degrades to a working page
 * instead of shipping a 404 into 184 articles.
 */

export const STATIC_ROUTES = [
  "/",
  "/about",
  "/blog",
  "/case-study",
  "/contact-us",
  "/location",
  "/privacy-policy",
  "/products",
  "/service",
];

export const SITE_ROUTES = new Set([
  ...STATIC_ROUTES,
  ...Object.keys(productPages).map((slug) => `/products/${slug}`),
  ...Object.keys(servicePages).map((slug) => `/services/${slug}`),
  ...Object.keys(locationPages).map((slug) => `/location/${slug}`),
]);

/**
 * Known-wrong paths in the WordPress copy, mapped to the page the author meant.
 * Only unambiguous corrections belong here; anything else falls back to the
 * nearest hub via SECTION_FALLBACKS.
 */
export const PATH_CORRECTIONS = {
  "/contact": "/contact-us",
  "/locations": "/location",
  "/location/melaka": "/location/laundromat-business-melaka-malaysia-2026",
  "/location/sabah": "/location/laundromat-business-sabah-sarawak-2026",
  "/location/sarawak": "/location/laundromat-business-sabah-sarawak-2026",
  "/location/sabah-sarawak": "/location/laundromat-business-sabah-sarawak-2026",
  "/services/business-consultancy": "/services/business-consultancy-for-laundromat-investors",
  "/services/business-promotion-and-branding-for-laundromats":
    "/services/business-promotion-and-branding-for-laundromat",
  "/services/finance-advisory": "/services/finance-advisory-for-laundry-startups",
  "/services/laundromat-setup": "/services/laundromat-setup-and-installation-malaysia",
  "/wales-series-professional-laundry-equipment":
    "/products/wales-series-professional-laundry-equipment",
  // Post permalinks that were renamed or mistyped on the blog.
  "/electrolux-commercial-washers-malaysia": "/electrolux-commercial-washer-malaysia",
  "/speed-queen-machines-malaysia": "/top-reasons-to-choose-speed-queen-washing-machines-in-malaysia",
  "/top-10-commercial-laundry-service-tools-parts-for-efficient-operations":
    "/commercial-laundry-tools-parts-malaysia-2026",
};

/** Where an unresolvable link in a given section should land instead. */
export const SECTION_FALLBACKS = [
  [/^\/products?\//, "/products"],
  [/^\/services?\//, "/service"],
  [/^\/locations?\//, "/location"],
];

export const DEFAULT_FALLBACK = "/blog";
