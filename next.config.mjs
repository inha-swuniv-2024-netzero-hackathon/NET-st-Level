/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '"pet-server-deploy.s3.us-east-2.amazonaws.com',
        port: '',
        pathname: '/net-zero/**',
      },
    ],
  },
};

export default nextConfig;
