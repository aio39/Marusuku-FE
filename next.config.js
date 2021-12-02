/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  env: {
    PORT: '3939',
    AWS_S3: 'https://marusuku.s3.ap-northeast-2.amazonaws.com/',
  },
  images: {
    domains: ['marusuku.s3.ap-northeast-2.amazonaws.com'],
  },
  // experimental: {
  //   // concurrentFeatures: true,
  // },
  // experimental: {
  //   async rewrites() {
  //     return [
  //       {
  //         source: '/api/login',
  //         destination: `http://localhost:8000/login`,
  //       },
  //       {
  //         source: '/api/logout',
  //         destination: `http://localhost:8000/logout`,
  //       },
  //       {
  //         source: '/api/:route*',
  //         destination: `http://localhost:8000/api/:route*`,
  //       },
  //     ];
  //   },
  // },
}

module.exports = nextConfig
