/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Enable static HTML export */
  output: 'export',
  
  /* config options here */
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;
