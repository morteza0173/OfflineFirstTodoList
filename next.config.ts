/** @type {import('next').NextConfig} */

import path from "path";

const isDev = process.env.NODE_ENV !== "production";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const withPWA = require("next-pwa")({
  dest: "public",

  disable: isDev,

  buildExcludes: ["app-build-manifest.json"],
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const generateAppDirEntry = (entry: () => Promise<any>) => {
  const packagePath = require.resolve("next-pwa");

  const packageDirectory = path.dirname(packagePath);

  const registerJs = path.join(packageDirectory, "register.js");

  return entry().then((entries) => {
    // Register SW on App directory, solution: https://github.com/shadowwalker/next-pwa/pull/427

    if (entries["main-app"] && !entries["main-app"].includes(registerJs)) {
      if (Array.isArray(entries["main-app"])) {
        entries["main-app"].unshift(registerJs);
      } else if (typeof entries["main-app"] === "string") {
        entries["main-app"] = [registerJs, entries["main-app"]];
      }
    }

    return entries;
  });
};

const nextConfig = {
  reactStrictMode: true,

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  webpack(config: { entry: { (): Promise<any>; (): Promise<any> } }) {
    if (!isDev) {
      const entry = generateAppDirEntry(config.entry);

      config.entry = () => entry;
    }

    return config;
  },
};

module.exports = withPWA(nextConfig);
