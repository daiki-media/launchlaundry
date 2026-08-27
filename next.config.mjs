import { REDIRECTS } from "./redirects.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: `next build` writes a self-contained site to ./out for
  // upload to any static host. See node_modules/next/dist/docs/01-app/02-guides/static-exports.md
  //
  // Consequences already handled in this repo:
  //   - No server at runtime, so Route Handlers that read the request are out.
  //     The contact form posts straight to NEXT_PUBLIC_CONTACT_ENDPOINT instead
  //     (src/components/contact/ContactForm.jsx).
  //   - next/image cannot use the optimizing server, hence `unoptimized` below.
  //   - URLs stay extensionless (no trailingSlash) so they keep matching the
  //     canonicals in each page's metadata and src/app/sitemap.js. Apache and
  //     LiteSpeed need public/.htaccess to map them onto the emitted .html files.
  output: "export",

  // The CMS API throttles at 60 requests a minute, so the first worker to call
  // getAllPosts spends about three and a half minutes pulling the 184 post
  // bodies (src/lib/blog.js) — past the 60s default this would abort on. The
  // rest of the workers read that sweep out of the build fetch cache.
  staticPageGenerationTimeout: 600,

  images: {
    unoptimized: true,
  },

  // `output: "export"` drops these from the build — they only run under
  // `next dev`. Production 301s come from public/.htaccess.
  async redirects() {
    return REDIRECTS.map((redirect) => ({ ...redirect, permanent: true }));
  },
};

export default nextConfig;
