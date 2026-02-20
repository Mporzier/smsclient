import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "export", // Tells Next.js to produce static files
  basePath: "smsclient", // ex: "" = racine, "/mon-site" = ...github.io/mon-site/
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
