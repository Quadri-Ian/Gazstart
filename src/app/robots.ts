import type { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://blueflare-energy.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/studio/', '/api/'] }],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
