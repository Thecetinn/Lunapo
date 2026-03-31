import type { NextConfig } from "next";
const config: NextConfig = {
  experimental: {
    turbo: {
      rules: {},
    },
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};
export default config;
