'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import ScrollReveal from '@/components/ui/ScrollReveal'

const mockNews = [
  { slug: 'blueflare-expands-offshore-operations', title: 'Blueflare Energy Expands Offshore Operations in the Caspian Sea', date: '2024-03-15', category: 'News' },
  { slug: 'sustainable-drilling-award', title: 'Blueflare Receives Sustainable Drilling Excellence Award', date: '2024-02-28', category: 'Press Release' },
  { slug: 'new-technology-deployment', title: 'Next-Generation Drilling Technology Successfully Deployed', date: '2024-01-20', category: 'Industry' },
]

export default function NewsSection() {
  const t = useTranslations('home.news')
  const locale = useLocale()
  const localePath = (href: string) => (locale === 'en' ? href : `/${locale}${href}`)
  return (
    <section className="bg-gray-50 py-24">
      <div className="container-custom">
        <ScrollReveal>
          <div className="mb-14 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="section-heading">{t('title')}</h2>
              <p className="section-subheading">{t('subtitle')}</p>
            </div>
            <Link href={localePath('/press-center')} className="shrink-0 font-semibold text-brand-orange hover:text-brand-orange-dark transition-colors">{t('viewAll')} →</Link>
          </div>
        </ScrollReveal>
        <div className="grid gap-8 md:grid-cols-3">
          {mockNews.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 0.1}>
              <article className="flex h-full flex-col rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-44 bg-gradient-brand flex items-center justify-center"><span className="text-4xl">📰</span></div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-brand-orange/10 px-2.5 py-0.5 text-xs font-semibold text-brand-orange">{post.category}</span>
                    <time className="text-xs text-gray-500">{new Date(post.date).toLocaleDateString()}</time>
                  </div>
                  <h3 className="mb-4 flex-1 font-display font-bold text-brand-navy line-clamp-2">{post.title}</h3>
                  <Link href={localePath(`/press-center/${post.slug}`)} className="inline-flex items-center text-sm font-semibold text-brand-orange hover:text-brand-orange-dark transition-colors">{t('readMore')} →</Link>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
