import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // 纯静态导出，交给 GitHub Pages（Actions）发
  output: "export",
  trailingSlash: true,
  images: {
    // 静态导出没有图片优化服务
    unoptimized: true,
  },
};

export default nextConfig;
