/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ["backend.treemix-eg.com"],
    },
    experimental: {
      optimizeFonts: false,
    },
  };
  
  export default nextConfig;
  