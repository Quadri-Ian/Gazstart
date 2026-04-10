import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Hero from '@/components/ui/Hero'
import ScrollReveal from '@/components/ui/ScrollReveal'
import TiltCard from '@/components/ui/TiltCard'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('drilling')
  return { title: t('hero.title'), description: t('hero.subtitle') }
}

export default function DrillingPage() {
  return <DrillingContent />
}

function DrillingContent() {
  const t = useTranslations('drilling')
  const services = [
    { icon: '🔩', title: 'Directional Drilling', desc: 'Precision directional and horizontal drilling services for complex reservoir access.' },
    { icon: '🌊', title: 'Offshore Drilling', desc: 'Deepwater and shallow water drilling operations with full safety compliance.' },
    { icon: '🏔️', title: 'Onshore Drilling', desc: 'High-performance land drilling across diverse geological formations.' },
    { icon: '🔬', title: 'Measurement While Drilling', desc: 'Real-time formation evaluation and wellbore positioning technology.' },
    { icon: '⚙️', title: 'Drilling Engineering', desc: 'Expert well design, planning, and optimization services.' },
    { icon: '🛡️', title: 'Well Control', desc: 'Industry-leading blowout prevention and well control operations.' },
  ]
  return (
    <>
      <Hero title={t('hero.title')} subtitle={t('hero.subtitle')} />
      <section className="py-20">
        <div className="container-custom">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <h2 className="section-heading">Comprehensive Drilling Solutions</h2>
              <p className="section-subheading">From exploration to production, we deliver precision drilling services</p>
            </div>
          </ScrollReveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.1}>
                <TiltCard className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
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
