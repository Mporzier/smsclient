import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "export", // Tells Next.js to produce static files
  // Repo = smsclient → ...github.io/smsclient/
  basePath: "/smsclient",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
