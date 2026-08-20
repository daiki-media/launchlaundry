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
  // Every pair below comes from the WordPress dump (_wp_old_slug); the same
  // list is mirrored as 301s in public/.htaccess for external traffic.
  "/do-your-business-with-expert-digital-solutions":
    "/laundromat-business-malaysia-2026",
  "/professional-web-design-for-modern-businesses":
    "/commercial-laundry-equipment-setup-malaysia-2026",
  "/reduce-costs-with-commercial-laundry-tools":
    "/reduce-commercial-laundry-costs-malaysia-2026",
  "/huebsch-dryer-parts-buying-guide-extend-the-life-of-your-dryer":
    "/huebsch-dryer-parts-malaysia-2026",
  "/top-5-replacement-parts-that-keep-your-laundry-machines-running-smoothly":
    "/laundry-machine-replacement-parts-malaysia-2026",
  "/how-to-choose-the-right-coin-laundry-machine-spare-parts-for-maximum-performance":
    "/coin-laundry-machine-spare-parts-malaysia-2026",
  "/electrolux-washer-spare-parts-maintenance-guide-for-long-lasting-performance":
    "/electrolux-laundry-equipment-price-malaysia-2026",
  "/top-huebsch-dryer-parts-every-laundry-business-should-keep-in-stock":
    "/top-huebsch-dryer-parts-every-laundry-business-should-keep-in-stock-html",
  "/speed-queen-commercial-laundry-machines-why-theyre-malaysias-top-choice":
    "/speed-queen-commercial-laundry-machines-why-they-are-malaysias-top-choice-html",
  "/how-to-choose-reliable-coin-laundry-machine-spare-parts-in-malaysia":
    "/how-to-choose-reliable-coin-laundry-machine-spare-parts-in-malaysia-html",
  "/industrial-washing-machine-parts-guide-maintenance-tips-for-longevity":
    "/industrial-washing-machine-parts-guide-maintenance-tips-for-longevity-html",
  "/where-to-find-genuine-commercial-laundry-machine-spare-parts-in-malaysia":
    "/where-to-find-genuine-commercial-laundry-machine-spare-parts-in-malaysia-html",
  "/alliance-laundry-systems-malaysia-trusted-solutions-for-large-scale-laundromats":
    "/alliance-laundry-systems-malaysia-trusted-slutions-for-large-scale-laundromats",
  "/behind-the-scenes-how-we-source-genuine-commercial-laundry-spare-parts-2":
    "/genuine-commercial-laundry-spare-parts-in-malaysia-our-sourcing-process",
  "/commercial-washing-machine-malaysia-price-guide-realistic-ranges":
    "/commercial-washing-machine-malaysia-price-realistic-range-guide",
  "/how-much-capital-do-you-need-to-open-a-laundromat-in-malaysia":
    "/how-much-capital-to-open-a-laundromat-in-malaysia",
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
