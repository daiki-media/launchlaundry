/**
 * Every old URL and the page it now lives at. Read by next.config.mjs and
 * src/lib/siteRoutes.js.
 *
 * `output: "export"` means Next's redirects() only runs under `next dev`; the
 * live 301s come from public/.htaccess. Add a pair here, add the RewriteRule
 * there too.
 */

export const REDIRECTS = [
  {
    source: "/do-your-business-with-expert-digital-solutions",
    destination: "/laundromat-business-malaysia-2026",
  },
  {
    source: "/professional-web-design-for-modern-businesses",
    destination: "/commercial-laundry-equipment-setup-malaysia-2026",
  },
  {
    source: "/reduce-costs-with-commercial-laundry-tools",
    destination: "/reduce-commercial-laundry-costs-malaysia-2026",
  },
  {
    source: "/huebsch-dryer-parts-buying-guide-extend-the-life-of-your-dryer",
    destination: "/huebsch-dryer-parts-malaysia-2026",
  },
  {
    source: "/top-5-replacement-parts-that-keep-your-laundry-machines-running-smoothly",
    destination: "/laundry-machine-replacement-parts-malaysia-2026",
  },
  {
    source: "/how-to-choose-the-right-coin-laundry-machine-spare-parts-for-maximum-performance",
    destination: "/coin-laundry-machine-spare-parts-malaysia-2026",
  },
  {
    source: "/top-10-commercial-laundry-service-tools-parts-for-efficient-operations",
    destination: "/commercial-laundry-tools-parts-malaysia-2026",
  },
  {
    source: "/top-10-commercial-laundry-service-tools-parts-for-efficient-operations-2",
    destination: "/commercial-laundry-tools-parts-malaysia-2026",
  },
  {
    source: "/electrolux-washer-spare-parts-maintenance-guide-for-long-lasting-performance",
    destination: "/electrolux-laundry-equipment-price-malaysia-2026",
  },

  // Sabah and Sarawak were never separate pages — one East Malaysia guide.
  {
    source: "/location/melaka",
    destination: "/location/laundromat-business-melaka-malaysia-2026",
  },
  {
    source: "/location/sabah-sarawak",
    destination: "/location/laundromat-business-sabah-sarawak-2026",
  },
  {
    source: "/location/sabah",
    destination: "/location/laundromat-business-sabah-sarawak-2026",
  },
  {
    source: "/location/sarawak",
    destination: "/location/laundromat-business-sabah-sarawak-2026",
  },

  // Earlier renames. The "-html" suffix and the "slutions" typo are the slugs
  // WordPress actually publishes today.
  {
    source: "/top-huebsch-dryer-parts-every-laundry-business-should-keep-in-stock",
    destination: "/top-huebsch-dryer-parts-every-laundry-business-should-keep-in-stock-html",
  },
  {
    source: "/speed-queen-commercial-laundry-machines-why-theyre-malaysias-top-choice",
    destination: "/speed-queen-commercial-laundry-machines-why-they-are-malaysias-top-choice-html",
  },
  {
    source: "/how-to-choose-reliable-coin-laundry-machine-spare-parts-in-malaysia",
    destination: "/how-to-choose-reliable-coin-laundry-machine-spare-parts-in-malaysia-html",
  },
  {
    source: "/industrial-washing-machine-parts-guide-maintenance-tips-for-longevity",
    destination: "/industrial-washing-machine-parts-guide-maintenance-tips-for-longevity-html",
  },
  {
    source: "/where-to-find-genuine-commercial-laundry-machine-spare-parts-in-malaysia",
    destination: "/where-to-find-genuine-commercial-laundry-machine-spare-parts-in-malaysia-html",
  },
  {
    source: "/alliance-laundry-systems-malaysia-trusted-solutions-for-large-scale-laundromats",
    destination: "/alliance-laundry-systems-malaysia-trusted-slutions-for-large-scale-laundromats",
  },
  {
    source: "/behind-the-scenes-how-we-source-genuine-commercial-laundry-spare-parts-2",
    destination: "/genuine-commercial-laundry-spare-parts-in-malaysia-our-sourcing-process",
  },
  {
    source: "/commercial-washing-machine-malaysia-price-guide-realistic-ranges",
    destination: "/commercial-washing-machine-malaysia-price-realistic-range-guide",
  },
  {
    source: "/how-much-capital-do-you-need-to-open-a-laundromat-in-malaysia",
    destination: "/how-much-capital-to-open-a-laundromat-in-malaysia",
  },
  {
    source: "/services/business-promotion-and-branding-for-laundromats",
    destination: "/services/business-promotion-and-branding-for-laundromat",
  },
  {
    source: "/services/business-promotion-and-branding-for-laundromats-2",
    destination: "/services/business-promotion-and-branding-for-laundromat",
  },

  // start-ups was the Research Planning page under a second slug; the
  // underscored spelling predates the move to hyphens.
  {
    source: "/services/start-ups",
    destination: "/services/research-planning-for-laundry-businesses",
  },
  {
    source: "/services/commercial_laundry_spare_parts_malaysia",
    destination: "/services/commercial-laundry-spare-parts-malaysia",
  },

  { source: "/contact-2", destination: "/contact-us" },
];

/** The same list as a plain `{ [oldPath]: newPath }` lookup. */
export const REDIRECT_MAP = Object.fromEntries(
  REDIRECTS.map(({ source, destination }) => [source, destination])
);
