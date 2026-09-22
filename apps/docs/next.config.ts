import type { NextConfig } from "next";

const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  transpilePackages: ["@9to6/ui"],
  images: { unoptimized: true },
};
export default config;
