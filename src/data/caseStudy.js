// /case-study page content, extracted from the WordPress database (post 3233).
//
// ⚠️ IMPORTANT — READ BEFORE LAUNCH
// On the live WordPress site this page was never given real content. The Elementor
// widget still holds the purchased theme's demo data:
//   • every card is titled "Financial analysis software 4.0 for JiCo JSC"
//   • every summary reads "Achieve Your a of Business"
//   • the filter tabs are "SEO Services / Web Design / Social / APP / Data Analysis"
//   • the intro paragraph is lorem ipsum
// Publishing that verbatim would be thin, off-topic content and would actively hurt
// the SEO this rebuild is meant to improve, so it has NOT been copied across.
//
// What IS real and has been kept: the page title, the Yoast meta title/description,
// the breadcrumb, the section badge/heading, and the seven images together with the
// laundry alt texts your team wrote for them.
//
// The `items` below are marked `placeholder: true`. Send the real case studies
// (title, client, one-line result, category) and they drop straight in here.

export const caseStudyMeta = {
  title: "Laundry Business Success Case Studies",
  description:
    "Read laundry business success case studies with Launch Laundry and learn strategies to grow, optimize, and succeed in the industry.",
  focusKeyword: "success stories",
};

export const pageHero = {
  title: "Case Study",
  breadcrumb: [{ label: "Launch Laundry", href: "/" }, { label: "Case Study" }],
};

export const intro = {
  badge: "What we offers",
  title: "Explore Our Projects",
  description:
    "Real laundromat projects we have planned, equipped, and launched across Malaysia — from single self-service outlets to multi-store operations.",
};

// Filter tabs. "All Projects" is always first and is not stored here.
export const categories = [
  "Laundromat Setup",
  "Equipment Supply",
  "Business Consultancy",
  "Branding & Marketing",
];

export const items = [
  {
    placeholder: true,
    title: "Professional laundry graphic",
    summary: "",
    category: "Branding & Marketing",
    image: "/images/case-study/professional-laundry-graphic.png",
    imageAlt: "Professional laundry graphic",
  },
  {
    placeholder: true,
    title: "Laundry maintenance chart",
    summary: "",
    category: "Business Consultancy",
    image: "/images/case-study/laundry-maintenance-chart.png",
    imageAlt: "Laundry maintenance chart",
  },
  {
    placeholder: true,
    title: "Washing equipment display",
    summary: "",
    category: "Equipment Supply",
    image: "/images/case-study/washing-equipment-display.png",
    imageAlt: "Washing equipment display",
  },
  {
    placeholder: true,
    title: "Laundry analytics dashboard",
    summary: "",
    category: "Business Consultancy",
    image: "/images/case-study/laundry-analytics-dashboard.png",
    imageAlt: "Laundry analytics dashboard",
  },
  {
    placeholder: true,
    title: "Laundry shop interior view",
    summary: "",
    category: "Laundromat Setup",
    image: "/images/case-study/laundry-shop-interior-view.png",
    imageAlt: "Laundry shop interior view",
  },
  {
    placeholder: true,
    title: "Self-service washing machines",
    summary: "",
    category: "Laundromat Setup",
    image: "/images/case-study/self-service-washing-machines.png",
    imageAlt: "Self-service washing machines",
  },
  {
    placeholder: true,
    title: "Commercial laundry solution",
    summary: "",
    category: "Equipment Supply",
    image: "/images/case-study/commercial-laundry-solution.png",
    imageAlt: "Commercial laundry solution",
  },
];
