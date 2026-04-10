import HomeHero from '@/components/sections/HomeHero'
import StatsSection from '@/components/sections/StatsSection'
import ServicesSection from '@/components/sections/ServicesSection'
import NewsSection from '@/components/sections/NewsSection'
import PartnersCarousel from '@/components/sections/PartnersCarousel'
import CtaSection from '@/components/sections/CtaSection'

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <StatsSection />
      <ServicesSection />
      <NewsSection />
      <PartnersCarousel />
      <CtaSection />
    </>
  )
}
