import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    const cacheHeader = [
      {
        key: "Cache-Control",
        value: "public, max-age=31536000, immutable",
      },
    ];
    return [
      { source: "/results/:path*", headers: cacheHeader },
      { source: "/webp_frames_20fps/:path*", headers: cacheHeader },
      { source: "/before222.webp", headers: cacheHeader },
      { source: "/LIGHT-BG.png", headers: cacheHeader },
      { source: "/DARK-BG.png", headers: cacheHeader },
      { source: "/whatsapp.png", headers: cacheHeader },
    ];
  },
};

export default nextConfig;
