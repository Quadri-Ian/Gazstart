import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Hero from '@/components/ui/Hero'
import ScrollReveal from '@/components/ui/ScrollReveal'
import TiltCard from '@/components/ui/TiltCard'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('about')
  return { title: t('hero.title'), description: t('hero.subtitle') }
}

export default function AboutPage() {
  return (
    <div>
      <AboutContent />
    </div>
  )
}

function AboutContent() {
  const t = useTranslations('about')
  return (
    <>
      <Hero title={t('hero.title')} subtitle={t('hero.subtitle')} />
      <section className="py-20">
        <div className="container-custom">
          <div className="grid gap-12 md:grid-cols-2">
            <ScrollReveal>
              <TiltCard className="rounded-2xl bg-brand-navy p-8 text-white">
                <h2 className="mb-4 font-display text-2xl font-bold text-brand-orange">{t('mission.title')}</h2>
                <p className="leading-relaxed text-gray-300">{t('mission.text')}</p>
              </TiltCard>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <TiltCard className="rounded-2xl bg-brand-blue p-8 text-white">
                <h2 className="mb-4 font-display text-2xl font-bold text-brand-orange">{t('vision.title')}</h2>
                <p className="leading-relaxed text-gray-300">{t('vision.text')}</p>
              </TiltCard>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.3}>
            <div className="mt-16">
              <h2 className="section-heading text-center">{t('values.title')}</h2>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {(['safety', 'integrity', 'innovation', 'excellence'] as const).map((value, i) => (
                  <TiltCard key={value} className="rounded-xl border border-gray-200 p-6 text-center shadow-sm">
                    <div className="mb-3 text-4xl">{['🛡️', '🤝', '💡', '⭐'][i]}</div>
                    <h3 className="font-display font-semibold text-brand-navy">{t(`values.${value}`)}</h3>
                  </TiltCard>
                ))}
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <div className="mt-16 rounded-2xl bg-gray-50 p-10">
              <h2 className="section-heading">{t('history.title')}</h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">{t('history.text')}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
