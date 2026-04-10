import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Hero from '@/components/ui/Hero'
import ScrollReveal from '@/components/ui/ScrollReveal'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('procurement')
  return { title: t('hero.title'), description: t('hero.subtitle') }
}

export default function ProcurementPage() {
  return <ProcurementContent />
}

function ProcurementContent() {
  const t = useTranslations('procurement')
  const steps = [
    { step: '01', title: 'Vendor Registration', desc: 'Complete our vendor registration process to become an approved supplier in our network.' },
    { step: '02', title: 'Qualification Review', desc: 'Our procurement team reviews your capabilities, certifications, and track record.' },
    { step: '03', title: 'Tender Participation', desc: 'Qualified vendors receive invitations to participate in relevant tender processes.' },
    { step: '04', title: 'Contract Award', desc: 'Successful bids result in contract award and onboarding into our supplier network.' },
  ]
  return (
    <>
      <Hero title={t('hero.title')} subtitle={t('hero.subtitle')} />
      <section className="py-20">
        <div className="container-custom">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <h2 className="section-heading">Procurement Process</h2>
              <p className="section-subheading">How to become a Blueflare Energy supplier</p>
            </div>
          </ScrollReveal>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <ScrollReveal key={s.step} delay={i * 0.1}>
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange font-display text-xl font-bold text-white">{s.step}</div>
                  <h3 className="mb-2 font-display font-bold text-brand-navy">{s.title}</h3>
                  <p className="text-sm text-gray-600">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={0.5}>
            <div className="mt-16 rounded-2xl bg-gradient-brand p-10 text-center text-white">
              <h3 className="mb-4 font-display text-2xl font-bold">Ready to Become a Supplier?</h3>
              <p className="mb-6 text-gray-300">Download our vendor qualification package and start the registration process.</p>
              <button className="btn-secondary">Download Vendor Package</button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
