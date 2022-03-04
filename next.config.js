/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGO_URI: "mongodb+srv://sakthi_db:test@cluster0.stmyj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  }
}

module.exports = nextConfig
