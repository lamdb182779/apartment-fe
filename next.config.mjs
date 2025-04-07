/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
        domains: ['res.cloudinary.com']
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
