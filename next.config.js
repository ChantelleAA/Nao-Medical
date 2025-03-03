// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
      // These environment variables will be available on the client side
      APP_NAME: 'Healthcare Translation App',
    },
    // Enable SWC minification
    swcMinify: true,
    // Configure headers for security
    async headers() {
      return [
        {
          // Apply these headers to all routes
          source: '/:path*',
          headers: [
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            {
              key: 'X-Frame-Options',
              value: 'DENY',
            },
            {
              key: 'X-XSS-Protection',
              value: '1; mode=block',
            },
            {
              key: 'Referrer-Policy',
              value: 'strict-origin-when-cross-origin',
            },
            {
              key: 'Content-Security-Policy',
              value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; connect-src 'self' https://api.openai.com; img-src 'self' data:; style-src 'self' 'unsafe-inline'; font-src 'self';",
            },
          ],
        },
      ];
    },
  };
  
  module.exports = nextConfig;