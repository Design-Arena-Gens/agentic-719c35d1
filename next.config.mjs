/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["@headlessui/react", "@heroicons/react/24/outline"],
    serverActions: {
      allowedOrigins: ["localhost:3000", "agentic-719c35d1.vercel.app"]
    }
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "Content-Security-Policy",
          value: "default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
        },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin"
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff"
        },
        {
          key: "X-Frame-Options",
          value: "DENY"
        },
        {
          key: "Permissions-Policy",
          value: "microphone=(), camera=(), geolocation=(), interest-cohort=()"
        }
      ]
    }
  ]
};

export default nextConfig;
