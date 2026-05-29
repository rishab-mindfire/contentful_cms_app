/** @type {import('next').NextConfig} */

const strapiUrl = new URL(process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337');

const nextConfig = {
  images: {
    remotePatterns: [
      // strapi tool
      {
        protocol: strapiUrl.protocol.replace(':', '') as 'http' | 'https',
        hostname: strapiUrl.hostname,
        port: strapiUrl.port,
        pathname: '/uploads/**',
      },
      // GitHub Avatars
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      },
      // Google Avatars
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
