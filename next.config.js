/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_HOST: process.env.NEXT_HOST
  }
}

module.exports = nextConfig
