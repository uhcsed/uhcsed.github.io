/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    cpus: 1,
  },
  async redirects() {
    return [
      {
        source: '/courses/cs374-spring-2023',
        destination: 'https://cs374-spring-2023.netlify.app',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
