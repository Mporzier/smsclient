import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "export", // Tells Next.js to produce static files
  basePath: "/sms-facile-landing", // Replace with your actual repository name
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
