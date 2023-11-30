/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/*",
      },
      {
        hostname: "fakestoreapi.com",
        port: "",
        pathname: "/img/*",
      },
    ],
  },
};

module.exports = nextConfig;
