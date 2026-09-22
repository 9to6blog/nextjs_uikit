import type { NextConfig } from "next";

const config: NextConfig = {
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  trailingSlash: true,
  transpilePackages: ["@9to6/ui"],
  images: { unoptimized: true },
};
export default config;
