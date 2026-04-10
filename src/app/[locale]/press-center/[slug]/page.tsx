import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import Hero from '@/components/ui/Hero'

const mockNews = [
  {
    slug: 'blueflare-expands-offshore-operations',
    title: 'Blueflare Energy Expands Offshore Operations in the Caspian Sea',
    excerpt: 'Blueflare Energy announces a major expansion of its offshore drilling operations.',
    date: '2024-03-15',
    category: 'News',
    body: "Blueflare Energy has announced a significant expansion of its offshore drilling operations in the Caspian Sea region.\n\nThe expansion includes the deployment of three new drilling rigs and the establishment of a regional operations center. The investment is expected to create over 500 new jobs in the region.\n\nCEO John Anderson commented: \"This expansion reflects our confidence in the long-term potential of the Caspian region.\"",
  },
  {
    slug: 'sustainable-drilling-award',
    title: 'Blueflare Receives Sustainable Drilling Excellence Award',
    excerpt: 'The company has been recognized for its outstanding commitment to environmentally responsible drilling practices.',
    date: '2024-02-28',
    category: 'Press Release',
    body: "Blueflare Energy has been honored with the prestigious Sustainable Drilling Excellence Award at the Annual Energy Services Conference.\n\nThe award acknowledges Blueflare's implementation of innovative technologies that have significantly reduced carbon emissions, water usage, and environmental impact across its operations.",
  },
  {
    slug: 'q4-2023-results',
    title: 'Blueflare Energy Reports Strong Q4 2023 Financial Results',
    excerpt: 'Record revenue and project completions highlight a successful year.',
    date: '2024-02-01',
    category: 'Press Release',
    body: 'Blueflare Energy today reported strong financial results for the fourth quarter and full year 2023.\n\nRevenue increased 28% year-over-year, driven by expanded operations across all business segments and strong demand for drilling and oilfield services.',
  },
  {
    slug: 'new-technology-deployment',
    title: 'Next-Generation Drilling Technology Successfully Deployed',
    excerpt: 'Blueflare deploys cutting-edge AI-assisted drilling optimization technology.',
    date: '2024-01-20',
    category: 'Industry',
    body: 'Blueflare Energy has successfully deployed its next-generation AI-assisted drilling optimization platform across its flagship projects.\n\nThe technology reduces drilling time by up to 30% while improving wellbore quality and reducing environmental impact.',
  },
  {
    slug: 'community-investment-program',
    title: 'Community Investment Program Reaches $10M Milestone',
    excerpt: "Blueflare Energy's community development initiatives reach a significant investment milestone.",
    date: '2024-01-05',
    category: 'News',
    body: "Blueflare Energy's community investment program has reached the $10 million milestone, supporting education, healthcare, and infrastructure development across the regions where we operate.\n\nThe program has benefited over 50,000 community members to date.",
  },
  {
    slug: 'partnership-announcement',
    title: 'Strategic Partnership Announced with GlobalTech Energy',
    excerpt: 'A new strategic alliance to accelerate innovation in oilfield services.',
    date: '2023-12-18',
    category: 'News',
    body: "Blueflare Energy and GlobalTech Energy have announced a strategic partnership to accelerate innovation in oilfield services and digital transformation.\n\nThe partnership will combine Blueflare's operational expertise with GlobalTech's advanced digital technologies.",
  },
]

interface PageProps {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = mockNews.find((n) => n.slug === slug)
  return { title: post?.title ?? 'Article', description: post?.excerpt }
}

export function generateStaticParams() {
  return mockNews.map((post) => ({ slug: post.slug }))
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params
  const post = mockNews.find((n) => n.slug === slug) ?? mockNews[0]
  return <NewsDetailContent post={post} />
}

function NewsDetailContent({ post }: { post: (typeof mockNews)[0] }) {
  const t = useTranslations('pressCenter')
  return (
    <>
      <Hero title={post.title} subtitle={post.category} />
      <section className="py-20">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <Link
              href="../press-center"
              className="mb-8 inline-flex items-center text-brand-orange hover:text-brand-orange-dark font-semibold"
            >
              ← {t('backToNews')}
            </Link>
            <div className="mb-6 flex items-center gap-4">
              <span className="rounded-full bg-brand-orange/10 px-3 py-1 text-sm font-semibold text-brand-orange">{post.category}</span>
              <time className="text-gray-500">{t('publishedOn')} {new Date(post.date).toLocaleDateString()}</time>
            </div>
            <div className="prose prose-lg max-w-none">
              {post.body.split('\n\n').map((para, i) => (
                <p key={i} className="mb-4 text-gray-700 leading-relaxed">{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
