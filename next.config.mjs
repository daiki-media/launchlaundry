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

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
