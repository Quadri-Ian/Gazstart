import type { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://blueflare-energy.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/company/about', '/company/sustainable-development', '/services/drilling', '/services/service', '/press-center', '/careers', '/procurement', '/contacts']
  const locales = ['en', 'ru']
  const entries: MetadataRoute.Sitemap = []
  for (const locale of locales) {
    for (const route of routes) {
      const path = locale === 'en' ? route || '/' : `/${locale}${route || ''}`
      entries.push({ url: `${baseUrl}${path}`, lastModified: new Date(), changeFrequency: 'weekly', priority: route === '' ? 1 : 0.8 })
    }
  }
  return entries
}
