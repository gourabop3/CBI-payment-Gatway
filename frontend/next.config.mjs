/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: process.env.NEXT_PUBLIC_BASE_URI ? `${process.env.NEXT_PUBLIC_BASE_URI}/:path*` : 'http://localhost:8000/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig;
