/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'http://45.138.158.156:8008/api/v1/:path*',
      },
    ];
  },
};

module.exports = nextConfig; 