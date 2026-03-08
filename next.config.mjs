/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.benitapets.com",
      },
    ],
  },
};

export default nextConfig;
