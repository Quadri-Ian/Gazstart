'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import ScrollReveal from '@/components/ui/ScrollReveal'
import TiltCard from '@/components/ui/TiltCard'

export default function ServicesSection() {
  const t = useTranslations('home.services')
  const locale = useLocale()
  const localePath = (href: string) => (locale === 'en' ? href : `/${locale}${href}`)
  const services = [
    { key: 'drilling', href: '/services/drilling', icon: '🔩', gradient: 'from-brand-navy to-brand-blue' },
    { key: 'oilfield', href: '/services/service', icon: '🛢️', gradient: 'from-brand-blue to-brand-blue-light' },
  ]
  return (
    <section className="py-24">
      <div className="container-custom">
        <ScrollReveal>
          <div className="mb-14 text-center">
            <h2 className="section-heading">{t('title')}</h2>
            <p className="section-subheading">{t('subtitle')}</p>
          </div>
        </ScrollReveal>
        <div className="grid gap-8 md:grid-cols-2">
          {services.map((service, i) => (
            <ScrollReveal key={service.key} delay={i * 0.15}>
              <TiltCard className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${service.gradient} p-10 text-white`}>
                <div className="mb-4 text-6xl">{service.icon}</div>
                <h3 className="mb-3 font-display text-2xl font-bold">{t(`${service.key}.title` as 'drilling.title' | 'oilfield.title')}</h3>
                <p className="mb-6 text-gray-300 leading-relaxed">{t(`${service.key}.description` as 'drilling.description' | 'oilfield.description')}</p>
                <Link href={localePath(service.href)} className="inline-flex items-center gap-2 font-semibold text-brand-orange hover:gap-3 transition-all">Learn More →</Link>
                <div className="absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-white/5" />
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
