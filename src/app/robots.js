import { SITE_URL } from "@/components/seo/JsonLd";

// Required by output: "export" — this metadata route is generated once at
// build time and written into ./out as a plain file.
export const dynamic = "force-static";

export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
