/**
 * Next.js configuration.
 *
 * Kept as plain JavaScript (.mjs) on purpose: the production host runs an older
 * glibc than the native SWC binary expects, so Next falls back to the WASM SWC
 * build. A TypeScript config (next.config.ts) has to be compiled with SWC
 * before it can be read, which fails in that fallback path. Plain JS avoids the
 * problem entirely.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
