// 404 page content. Edit copy here — components only handle layout.
//
// Rendered by src/app/not-found.js, which Next.js serves for two cases:
//   1. any URL that matches no route,
//   2. any notFound() call in a dynamic segment (products, services, location).
// Keep `quickLinks` pointing at routes that actually exist — a dead link on the
// dead-link page is the one mistake this page cannot afford.

export const pageHero = {
  title: "Page Not Found",
  breadcrumb: [{ label: "Launch Laundry", href: "/" }, { label: "404" }],
};

export const notFound = {
  code: "404",
  badge: "Lost Load",
  title: "This page has gone missing",
  description:
    "The page you are looking for was moved, renamed, or never existed. The link may be out of date — but everything else is still right where you left it.",
  primary: { label: "Back to Homepage", href: "/" },
  secondary: { label: "Contact Us", href: "/contact-us" },
};

export const quickLinks = [
  {
    label: "Products",
    href: "/products",
    description: "Commercial washers, dryers, and genuine spare parts.",
  },
  {
    label: "Services",
    href: "/service",
    description: "Setup, installation, maintenance, and business consultancy.",
  },
  {
    label: "Our Locations",
    href: "/location",
    description: "Laundromat opportunities across Malaysia, state by state.",
  },
  {
    label: "Case Studies",
    href: "/case-study",
    description: "Real stores we have launched and the results they see.",
  },
];

export const cta = {
  title: "Still can’t find what you need?",
  description:
    "Tell us what you were looking for and our team will point you to the right machine, part, or service.",
  button: { label: "Talk to Launch Laundry", href: "/contact-us" },
};
