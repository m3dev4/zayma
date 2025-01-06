/* eslint-disable @typescript-eslint/no-require-imports */
import type { NextConfig } from "next";
import path from "path";
import CompressionPlugin from 'compression-webpack-plugin';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(
        new CompressionPlugin({
          algorithm: 'gzip',
          test: /\.(js|css|html|svg)$/,
          threshold: 10240,
          minRatio: 0.8,
        }),
      );
    }

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

    const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
    if (!isServer) {
      config.plugins.push(new BundleAnalyzerPlugin());
    }

    config.module.rules.push({
      test: /\.css$/,
      use: [
        "style-loader",
        "css-loader",
        {
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              plugins: ["tailwindcss", "autoprefixer"],
            },
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
