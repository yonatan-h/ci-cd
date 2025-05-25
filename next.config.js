/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, //avoid calling the page.tsx twice
  output: "standalone",
};

module.exports = nextConfig;
