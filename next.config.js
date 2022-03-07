/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_HOST: process.env.NEXT_HOST
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://next-notes-app-phi.vercel.app/:path*',
      },
    ]
  },
}

module.exports = nextConfig
