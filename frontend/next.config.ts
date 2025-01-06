/* eslint-disable @typescript-eslint/no-require-imports */
import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg|webp)$/i,
      use: [
        {
          loader: "file-loader",
          options: {
            outputPath: "static/images/",
            publicPath: "/_next/static/images/",
            name: "[name].[hash].[ext]",
          },
        },
        {
          loader: "image-webpack-loader",
          options: {
            mozjpeg: { progressive: true },
            optipng: { enabled: false },
            pngquant: { quality: [0.65, 0.9], speed: 4 },
            gifsicle: { interlaced: false },
            webp: { quality: 75 },
          },
        },
      ],
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      "@components": path.resolve(__dirname, "components/"),
      "@styles": path.resolve(__dirname, "styles/"),
    };

    return config;
  },
};


export default nextConfig;
