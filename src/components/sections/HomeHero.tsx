'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

export default function HomeHero() {
  const t = useTranslations('home.hero')
  const locale = useLocale()
  const localePath = (href: string) => (locale === 'en' ? href : `/${locale}${href}`)

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-gradient-brand pt-16">
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-brand-orange/10 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/3 h-80 w-80 rounded-full bg-brand-blue-light/20 blur-3xl" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>
      <div className="container-custom relative z-10 py-24 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand-orange/20 px-4 py-2 text-sm font-semibold text-brand-orange">
          <span className="h-2 w-2 rounded-full bg-brand-orange animate-pulse" />
          World-Class Energy Services
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="font-display text-5xl font-bold text-white md:text-6xl lg:text-7xl">
          {t('title')}
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="mx-auto mt-6 max-w-2xl text-xl text-gray-300">
          {t('subtitle')}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link href={localePath('/services/drilling')} className="btn-primary text-lg px-8 py-4">{t('cta')}</Link>
          <Link href={localePath('/company/about')} className="btn-secondary text-lg px-8 py-4">{t('ctaSecondary')}</Link>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-gray-400">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="h-10 w-6 rounded-full border-2 border-gray-400 p-1">
            <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="h-2 w-2 rounded-full bg-brand-orange" />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
