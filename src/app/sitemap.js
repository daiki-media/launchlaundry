import { SITE_URL } from "@/components/seo/JsonLd";
import { productPages } from "@/data/products";
import { locationPages } from "@/data/locations";
import { servicePages } from "@/data/services";
import { getAllPosts, getPageCount, blogPagePath, postPath } from "@/lib/blog";

// Required by output: "export" — this metadata route is generated once at
// build time and written into ./out as a plain file.
export const dynamic = "force-static";

// Add new routes here as each page is built.
const routes = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/products", priority: 0.9, changeFrequency: "monthly" },
  { path: "/service", priority: 0.9, changeFrequency: "monthly" },
  { path: "/location", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact-us", priority: 0.8, changeFrequency: "yearly" },
  { path: "/case-study", priority: 0.7, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.9, changeFrequency: "weekly" },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
];

export default async function sitemap() {
  const lastModified = new Date();

  const productRoutes = Object.keys(productPages).map((slug) => ({
    path: `/products/${slug}`,
    priority: 0.8,
    changeFrequency: "monthly",
  }));

  const locationRoutes = Object.keys(locationPages).map((slug) => ({
    path: `/location/${slug}`,
    priority: 0.7,
    changeFrequency: "monthly",
  }));

  const serviceRoutes = Object.keys(servicePages).map((slug) => ({
    path: `/services/${slug}`,
    priority: 0.8,
    changeFrequency: "monthly",
  }));

  // Blog listing pages 2..N. Page 1 is already in `routes` as /blog.
  const totalPages = await getPageCount();
  const blogPageRoutes = Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({
    path: blogPagePath(i + 2),
    priority: 0.4,
    changeFrequency: "weekly",
  }));

  const staticRoutes = [
    ...routes,
    ...productRoutes,
    ...locationRoutes,
    ...serviceRoutes,
    ...blogPageRoutes,
  ].map((route) => ({
    url: `${SITE_URL}${route.path === "/" ? "" : route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Every post, with the real modified date from the CMS so crawlers can tell
  // what actually changed between builds.
  const posts = await getAllPosts();
  const postRoutes = posts.map((post) => ({
    url: `${SITE_URL}${postPath(post.slug)}`,
    lastModified: new Date(post.modified || post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes];
}
