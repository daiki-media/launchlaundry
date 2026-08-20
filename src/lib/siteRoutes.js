import { productPages } from "@/data/products";
import { servicePages } from "@/data/services";
import { locationPages } from "@/data/locations";
import { REDIRECT_MAP } from "../../redirects";


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


export const PATH_CORRECTIONS = {
  ...REDIRECT_MAP,
  "/contact": "/contact-us",
  "/locations": "/location",
  "/services/business-consultancy": "/services/business-consultancy-for-laundromat-investors",
  "/services/finance-advisory": "/services/finance-advisory-for-laundry-startups",
  "/services/laundromat-setup": "/services/laundromat-setup-and-installation-malaysia",
  "/wales-series-professional-laundry-equipment":
    "/products/wales-series-professional-laundry-equipment",
  "/electrolux-commercial-washers-malaysia": "/electrolux-commercial-washer-malaysia",
  "/speed-queen-machines-malaysia": "/top-reasons-to-choose-speed-queen-washing-machines-in-malaysia",
};

/** Where an unresolvable link in a given section should land instead. */
export const SECTION_FALLBACKS = [
  [/^\/products?\//, "/products"],
  [/^\/services?\//, "/service"],
  [/^\/locations?\//, "/location"],
];

export const DEFAULT_FALLBACK = "/blog";
