const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
  async redirects() {
    return [
      {
        source: '/hot-takes-tan-stack-and-open-source-with-tanner-linsley',
        destination: '/hot-takes-tanstack-and-open-source-with-tanner-linsley',
        permanent: true,
      },
      {
        source:
          '/creating-code-pen-tackling-tailwind-and-keeping-it-simple-with-chris-coyier',
        destination:
          'creating-codepen-tackling-tailwind-and-keeping-it-simple-with-chris-coyier',
        permanent: true,
      },
    ];
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  },
});

module.exports = nextConfig;
