/** @type {import('next').NextConfig} */
const root = new URL(".", import.meta.url).pathname;

const nextConfig = {
  turbopack: {
    root
  },
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
