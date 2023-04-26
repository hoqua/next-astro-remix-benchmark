/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.OKKINO_WEB_STORAGE_ENDPOINT
      }
    ]
  }
}

module.exports = nextConfig
