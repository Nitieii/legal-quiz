/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static exports
  images: {
    unoptimized: true, // Required for static export
  },
  // Disable server-side features since we're doing static export
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
