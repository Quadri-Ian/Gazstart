'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import ScrollReveal from '@/components/ui/ScrollReveal'

export default function CtaSection() {
  const t = useTranslations('home.cta')
  const locale = useLocale()
  const localePath = (href: string) => (locale === 'en' ? href : `/${locale}${href}`)
  return (
    <section className="py-24">
      <div className="container-custom">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-brand p-12 text-center md:p-20">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute left-1/4 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-brand-orange blur-3xl" />
              <div className="absolute right-1/4 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-white blur-3xl" />
            </div>
            <div className="relative z-10">
              <h2 className="font-display text-4xl font-bold text-white md:text-5xl">{t('title')}</h2>
              <p className="mx-auto mt-4 max-w-xl text-xl text-gray-300">{t('subtitle')}</p>
              <Link href={localePath('/contacts')} className="btn-primary mt-8 inline-flex text-lg px-8 py-4">{t('button')}</Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
