/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/threadbare-resale',
  assetPrefix: '/threadbare-resale/',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
