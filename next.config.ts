import type { NextConfig } from "next";

// Sitio de presentación: HTML estático para GitHub Pages (dominio propio vía public/CNAME).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
