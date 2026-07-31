/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  distDir: "dist",
  basePath: process.env.GITHUB_PAGES_BASE_PATH ?? "/rademacher-exposition"
};

export default nextConfig;
