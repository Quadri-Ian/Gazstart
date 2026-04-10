'use client'

import { motion } from 'framer-motion'

interface HeroProps {
  title: string
  subtitle?: string
  className?: string
}

export default function Hero({ title, subtitle, className = '' }: HeroProps) {
  return (
    <section className={`relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-gradient-brand pt-16 ${className}`}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-brand-orange blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-48 w-48 rounded-full bg-brand-blue-light blur-3xl" />
      </div>
      <div className="container-custom relative z-10 py-20 text-center">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl">
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="mx-auto mt-6 max-w-2xl text-lg text-gray-300 md:text-xl">
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}
