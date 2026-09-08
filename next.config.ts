import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      // onOffice photo CDN
      {
        protocol: 'https',
        hostname: '**.onoffice.de',
      },
      {
        protocol: 'https',
        hostname: 'onoffice.de',
      },
    ],
  },
};

export default nextConfig;
