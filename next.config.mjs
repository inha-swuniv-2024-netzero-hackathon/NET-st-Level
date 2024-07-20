/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'http://ec2-3-19-39-78.us-east-2.compute.amazonaws.com:8080/:path*', // HTTP API 서버 주소
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pet-server-deploy.s3.us-east-2.amazonaws.com',
        port: '',
        pathname: '/net-zero/**',
      },
    ],
  },
};

export default nextConfig;
