'use client'

import { useTranslations } from 'next-intl'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import ScrollReveal from '@/components/ui/ScrollReveal'

const partners = [
  { id: 1, name: 'EnergyTech Global', abbr: 'ETG' },
  { id: 2, name: 'PetroCore Solutions', abbr: 'PCS' },
  { id: 3, name: 'DrilTech International', abbr: 'DTI' },
  { id: 4, name: 'OilField Partners', abbr: 'OFP' },
  { id: 5, name: 'Global Energy Corp', abbr: 'GEC' },
  { id: 6, name: 'Subsea Systems Ltd', abbr: 'SSL' },
  { id: 7, name: 'Rig Masters Inc', abbr: 'RMI' },
  { id: 8, name: 'WellTech Services', abbr: 'WTS' },
]

export default function PartnersCarousel() {
  const t = useTranslations('home.partners')
  return (
    <section className="py-16 border-y border-gray-200">
      <div className="container-custom">
        <ScrollReveal>
          <h2 className="mb-10 text-center font-display text-2xl font-bold text-brand-navy">{t('title')}</h2>
        </ScrollReveal>
        <Swiper modules={[Autoplay]} slidesPerView={2} spaceBetween={24} loop={true} autoplay={{ delay: 0, disableOnInteraction: false }} speed={4000} breakpoints={{ 640: { slidesPerView: 3 }, 768: { slidesPerView: 4 }, 1024: { slidesPerView: 6 } }}>
          {partners.map((partner) => (
            <SwiperSlide key={partner.id}>
              <div className="flex h-20 items-center justify-center rounded-xl bg-gray-50 px-6 hover:bg-gray-100 transition-colors">
                <div className="text-center">
                  <div className="font-display text-xl font-bold text-brand-navy opacity-60">{partner.abbr}</div>
                  <div className="text-xs text-gray-400">{partner.name}</div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
