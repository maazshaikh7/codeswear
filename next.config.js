/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGO_URI: "mongodb://localhost:27017",
    JWT_SECREAT: "p0o9j6hyrtve1xfdt",
  },
};

module.exports = nextConfig;
