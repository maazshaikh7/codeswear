/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGO_URI: "mongodb://localhost:27017",
  },
};

module.exports = nextConfig;
