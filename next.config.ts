import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts')

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  // Sanity Studio requires these packages to be transpiled
  transpilePackages: ['sanity', '@sanity/ui', '@sanity/vision', 'next-sanity'],
}

export default withNextIntl(nextConfig)
