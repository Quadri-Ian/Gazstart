import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import Hero from '@/components/ui/Hero'
import ScrollReveal from '@/components/ui/ScrollReveal'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('pressCenter')
  return { title: t('hero.title'), description: t('hero.subtitle') }
}

const mockNews = [
  { slug: 'blueflare-expands-offshore-operations', title: 'Blueflare Energy Expands Offshore Operations in the Caspian Sea', excerpt: "Blueflare Energy announces a major expansion of its offshore drilling operations, marking a significant milestone in the company's growth strategy.", date: '2024-03-15', category: 'News' },
  { slug: 'sustainable-drilling-award', title: 'Blueflare Receives Sustainable Drilling Excellence Award', excerpt: 'The company has been recognized for its outstanding commitment to environmentally responsible drilling practices.', date: '2024-02-28', category: 'Press Release' },
  { slug: 'q4-2023-results', title: 'Blueflare Energy Reports Strong Q4 2023 Financial Results', excerpt: 'Record revenue and project completions highlight a successful year of operational excellence and strategic growth.', date: '2024-02-01', category: 'Press Release' },
  { slug: 'new-technology-deployment', title: 'Next-Generation Drilling Technology Successfully Deployed', excerpt: 'Blueflare deploys cutting-edge AI-assisted drilling optimization technology across its flagship projects.', date: '2024-01-20', category: 'Industry' },
  { slug: 'community-investment-program', title: 'Community Investment Program Reaches $10M Milestone', excerpt: "Blueflare Energy's community development initiatives reach a significant investment milestone across operating regions.", date: '2024-01-05', category: 'News' },
  { slug: 'partnership-announcement', title: 'Strategic Partnership Announced with GlobalTech Energy', excerpt: 'A new strategic alliance designed to accelerate innovation in oilfield services and digital transformation.', date: '2023-12-18', category: 'News' },
]

export default function PressCenterPage() {
  return <PressCenterContent />
}

function PressCenterContent() {
  const t = useTranslations('pressCenter')
  return (
    <>
      <Hero title={t('hero.title')} subtitle={t('hero.subtitle')} />
      <section className="py-20">
        <div className="container-custom">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {mockNews.map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 0.1}>
                <article className="flex h-full flex-col rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-48 bg-gradient-brand flex items-center justify-center">
                    <span className="text-5xl">📰</span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="rounded-full bg-brand-orange/10 px-3 py-1 text-xs font-semibold text-brand-orange">{post.category}</span>
                      <time className="text-xs text-gray-500">{new Date(post.date).toLocaleDateString()}</time>
                    </div>
                    <h2 className="mb-3 font-display text-lg font-bold text-brand-navy line-clamp-2">{post.title}</h2>
                    <p className="mb-4 flex-1 text-sm text-gray-600 line-clamp-3">{post.excerpt}</p>
                    <Link href={`press-center/${post.slug}`} className="inline-flex items-center font-semibold text-brand-orange hover:text-brand-orange-dark transition-colors text-sm">
                      {t('readMore')} →
                    </Link>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
