//@ts-check
// eslint-disable-next-line @typescript-eslint/no-var-requires
/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: [process.env.OKKINO_WEB_STORAGE_ENDPOINT],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.OKKINO_WEB_STORAGE_ENDPOINT
      }
    ]
  }
}

module.exports = nextConfig
