/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Enable static HTML export */
  output: 'export',
  
  /* config options here */
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
