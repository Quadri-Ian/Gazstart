'use client'

import { useTranslations } from 'next-intl'
import CountUp from '@/components/ui/CountUp'
import ScrollReveal from '@/components/ui/ScrollReveal'

const stats = [
  { value: 25, suffix: '+', key: 'years' },
  { value: 500, suffix: '+', key: 'projects' },
  { value: 30, suffix: '+', key: 'countries' },
  { value: 5000, suffix: '+', key: 'employees' },
]

export default function StatsSection() {
  const t = useTranslations('home.stats')
  return (
    <section className="bg-brand-navy py-20">
      <div className="container-custom">
        <ScrollReveal>
          <h2 className="mb-12 text-center font-display text-3xl font-bold text-white md:text-4xl">{t('title')}</h2>
        </ScrollReveal>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.key} delay={i * 0.1}>
              <div className="text-center">
                <div className="font-display text-5xl font-bold text-brand-orange md:text-6xl">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-2 text-gray-400">{t(stat.key as 'years' | 'projects' | 'countries' | 'employees')}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
