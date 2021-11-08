const withLess = require('next-with-less');

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = withLess({
  env: {
    PORT: '3939',
  },
  lessLoaderOptions: {
    /* ... */
    lessOptions: {
      /* ... */
      modifyVars: {
        'primary-color': '#9900FF',
        'border-radius-base': '2px',
        /* ... */
      },
    },
  },
  experimental: {
    async rewrites() {
      return [
        {
          source: '/api/login',
          destination: `http://localhost:8000/login`,
        },
        {
          source: '/api/logout',
          destination: `http://localhost:8000/logout`,
        },
        {
          source: '/api/:route*',
          destination: `http://localhost:8000/api/:route*`,
        },
      ];
    },
  },
});


module.exports= nextConfig