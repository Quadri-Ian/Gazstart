import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Hero from '@/components/ui/Hero'
import ScrollReveal from '@/components/ui/ScrollReveal'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('sustainable')
  return { title: t('hero.title'), description: t('hero.subtitle') }
}

export default function SustainableDevelopmentPage() {
  return <SustainableContent />
}

function SustainableContent() {
  const t = useTranslations('sustainable')
  const pillars = [
    { icon: '🌱', title: 'Environmental Responsibility', desc: 'Minimizing our ecological footprint through cleaner technologies and responsible resource use.' },
    { icon: '👥', title: 'Social Impact', desc: 'Investing in local communities and creating opportunities for sustainable economic development.' },
    { icon: '📊', title: 'Governance', desc: 'Maintaining transparent, ethical, and accountable business practices across all operations.' },
    { icon: '♻️', title: 'Circular Economy', desc: 'Reducing waste and promoting reuse of materials throughout the project lifecycle.' },
  ]
  return (
    <>
      <Hero title={t('hero.title')} subtitle={t('hero.subtitle')} />
      <section className="py-20">
        <div className="container-custom">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <h2 className="section-heading">{t('commitment.title')}</h2>
              <p className="section-subheading mx-auto max-w-3xl">{t('commitment.text')}</p>
            </div>
          </ScrollReveal>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 0.1}>
                <div className="rounded-xl bg-white p-6 shadow-md border border-gray-100 text-center">
                  <div className="mb-4 text-5xl">{p.icon}</div>
                  <h3 className="mb-2 font-display font-bold text-brand-navy">{p.title}</h3>
                  <p className="text-sm text-gray-600">{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={0.4}>
            <div className="mt-16 rounded-2xl bg-gradient-brand p-10 text-white">
              <div className="grid gap-8 md:grid-cols-3 text-center">
                {[['50%', 'Carbon Reduction Goal by 2030'], ['100%', 'Renewable Energy Target by 2040'], ['Zero', 'Harm Safety Philosophy']].map(([val, label]) => (
                  <div key={label}>
                    <div className="mb-2 font-display text-4xl font-bold text-brand-orange">{val}</div>
                    <div className="text-gray-300">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
