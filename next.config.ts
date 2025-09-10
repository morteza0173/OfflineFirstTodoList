import createPWA from "next-pwa";

const withPWA = createPWA({
  dest: "public", 
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = {
  reactStrictMode: true,
};

export default withPWA(nextConfig);
