/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      's3.ap-northeast-2.amazonaws.com',
      'shopping-phinf.pstatic.net',
      'search.pstatic.net'
    ],
  },
};

export default nextConfig;