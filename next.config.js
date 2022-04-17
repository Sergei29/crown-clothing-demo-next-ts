/** @type {import('next').NextConfig} */
const nextEnv = require("next-env")
const dotenvLoad = require("dotenv-load")

dotenvLoad()

const withNextEnv = nextEnv()

const nextConfig = (phase, { defaultConfig }) => {
  return {
    ...defaultConfig,
    reactStrictMode: true,
    typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: true,
    },
    images: {
      domains: ["i.imgur.com"],
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      return config
    },
  }
}

module.exports = withNextEnv(nextConfig)
