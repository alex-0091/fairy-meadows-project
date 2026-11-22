/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Required for Prisma on Vercel
  serverExternalPackages: ['@prisma/client', 'bcryptjs'],
  // Output standalone for Docker/serverless (optional)
  // output: 'standalone',
};

export default nextConfig;
