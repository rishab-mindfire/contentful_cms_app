/** @type {import('next').NextConfig} */

// Do not use new URL() here. It is failing during the build phase.
// Define your hostnames explicitly as strings.
const nextConfig = {
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
    remotePatterns: [
      // 1. Localhost patterns
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '1337',
        pathname: '/uploads/**',
      },
      // 2. Your Production Render backend
      {
        protocol: 'https',
        hostname: 'strapi-backend-pm77.onrender.com',
        port: '',
        pathname: '/uploads/**',
      },
      // 3. Third-party providers
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
