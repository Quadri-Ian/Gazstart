import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Hero from '@/components/ui/Hero'
import ScrollReveal from '@/components/ui/ScrollReveal'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('careers')
  return { title: t('hero.title'), description: t('hero.subtitle') }
}

const openings = [
  { id: 1, title: 'Senior Drilling Engineer', location: 'Houston, TX', type: 'Full-time', dept: 'Engineering' },
  { id: 2, title: 'Offshore Rig Supervisor', location: 'Caspian Sea Region', type: 'Contract', dept: 'Operations' },
  { id: 3, title: 'HSE Manager', location: 'Dubai, UAE', type: 'Full-time', dept: 'Safety' },
  { id: 4, title: 'Geoscience Data Analyst', location: 'London, UK', type: 'Full-time', dept: 'Geoscience' },
  { id: 5, title: 'Project Manager – Oilfield Services', location: 'Almaty, Kazakhstan', type: 'Full-time', dept: 'Project Management' },
  { id: 6, title: 'Field Service Technician', location: 'Various Locations', type: 'Full-time', dept: 'Field Operations' },
]

export default function CareersPage() {
  return <CareersContent />
}

function CareersContent() {
  const t = useTranslations('careers')
  return (
    <>
      <Hero title={t('hero.title')} subtitle={t('hero.subtitle')} />
      <section className="py-20">
        <div className="container-custom">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <h2 className="section-heading">Current Openings</h2>
              <p className="section-subheading">Explore opportunities to grow your career with Blueflare Energy</p>
            </div>
          </ScrollReveal>
          <div className="space-y-4">
            {openings.map((job, i) => (
              <ScrollReveal key={job.id} delay={i * 0.08}>
                <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-display text-lg font-bold text-brand-navy">{job.title}</h3>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                      <span>📍 {job.location}</span>
                      <span>•</span>
                      <span>🏢 {job.dept}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-brand-navy/10 px-3 py-1 text-xs font-semibold text-brand-navy">{job.type}</span>
                    <button className="btn-primary text-sm py-2 px-4">Apply Now</button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
