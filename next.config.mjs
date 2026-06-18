/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nirvanaah.com"
      }
    ]
  }
};

export default nextConfig;
