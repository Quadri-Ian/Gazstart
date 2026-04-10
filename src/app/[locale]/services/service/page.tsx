import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Hero from '@/components/ui/Hero'
import ScrollReveal from '@/components/ui/ScrollReveal'
import TiltCard from '@/components/ui/TiltCard'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('oilfield')
  return { title: t('hero.title'), description: t('hero.subtitle') }
}

export default function OilfieldServicePage() {
  return <OilfieldContent />
}

function OilfieldContent() {
  const t = useTranslations('oilfield')
  const services = [
    { icon: '🛢️', title: 'Well Completion', desc: 'Full-service well completion including perforating, gravel packing, and stimulation.' },
    { icon: '🔧', title: 'Workover Services', desc: 'Well intervention and workover operations to restore and enhance production.' },
    { icon: '📈', title: 'Production Optimization', desc: 'Data-driven production enhancement strategies and artificial lift systems.' },
    { icon: '🔍', title: 'Well Testing', desc: 'Comprehensive well testing and reservoir characterization services.' },
    { icon: '🏗️', title: 'Facilities Engineering', desc: 'Surface facility design, construction, and commissioning services.' },
    { icon: '🌐', title: 'Pipeline Services', desc: 'Pipeline inspection, maintenance, and integrity management.' },
  ]
  return (
    <>
      <Hero title={t('hero.title')} subtitle={t('hero.subtitle')} />
      <section className="py-20">
        <div className="container-custom">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.1}>
                <TiltCard className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="mb-4 text-4xl">{s.icon}</div>
                  <h3 className="mb-2 font-display text-lg font-bold text-brand-navy">{s.title}</h3>
                  <p className="text-gray-600">{s.desc}</p>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
