import { REDIRECTS } from "./redirects.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  staticPageGenerationTimeout: 600,

  images: {
    unoptimized: true,
  },
  async redirects() {
    return REDIRECTS.map((redirect) => ({ ...redirect, permanent: true }));
  },
};

export default nextConfig;
