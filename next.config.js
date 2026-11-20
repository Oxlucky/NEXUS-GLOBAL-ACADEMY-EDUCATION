/** @type {import('next').NextConfig} */
const nextConfig = {
  // Give Vercel more time to prerender lesson pages on constrained build workers.
  staticPageGenerationTimeout: 180,
  // Avoid spawning several prerender workers competing for limited build resources.
  experimental: {
    cpus: 1,
  },
};

module.exports = nextConfig;
