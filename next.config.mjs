/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['@prisma/client']
    },
    // For Vercel deployment
    output: 'standalone',
    // Handle database migrations
    webpack: (config, { isServer }) => {
        if (isServer) {
            config.externals.push('@prisma/client')
        }
        return config
    }
}

export default nextConfig