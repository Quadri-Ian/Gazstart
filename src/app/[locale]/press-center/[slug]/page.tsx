import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import Hero from "@/components/ui/Hero";
import ScrollReveal from "@/components/ui/ScrollReveal";

const allNews = [
  {
    slug: "gazstart-secures-new-contracts",
    date: "2026-03-15",
    category: "Business",
    title: "GazStart Secures Major Drilling Contracts in Western Siberia",
    excerpt: "The company announces new multi-year agreements with leading energy producers.",
    content: `GazStart, a leading provider of drilling and oilfield services, today announced the signing of multi-year drilling service contracts with three major energy producers operating in the Western Siberia basin.

The contracts, valued at over $500 million combined, will see GazStart deploy 12 drilling rigs across multiple fields over the next three years. The agreements include provisions for performance bonuses tied to key efficiency metrics.

"These contracts demonstrate the trust our clients place in our technical capabilities and operational track record," said CEO Alexander Petrov. "We look forward to delivering exceptional results for our partners."

Operations are scheduled to commence in Q3 2026, with full ramp-up by year-end.`,
  },
  {
    slug: "safety-milestone-2025",
    date: "2026-02-20",
    category: "Safety",
    title: "GazStart Achieves Record Safety Milestone in 2025",
    excerpt: "Our operations recorded the lowest incident rate in company history.",
    content: `GazStart is proud to report that its 2025 safety performance reached record levels, with the Total Recordable Incident Rate (TRIR) falling to 0.21 — the lowest in the company's 25-year history and well below the industry average.

The achievement reflects a sustained commitment to safety culture, worker training, and process improvement across all operating sites.

"Safety is not just a metric — it's our most fundamental value," said COO Nikolai Grishankov. "Every person goes home safe. That's non-negotiable."

Key initiatives contributing to the milestone include mandatory behavior-based safety observations, enhanced permit-to-work systems, and a company-wide near-miss reporting program.`,
  },
  {
    slug: "technology-innovation-awards",
    date: "2026-01-10",
    category: "Innovation",
    title: "Innovation Awards Recognize GazStart Technology Advances",
    excerpt: "Three industry awards for pioneering work in directional drilling technology.",
    content: `At the annual Energy Technology Conference, GazStart received three prestigious industry awards recognizing its contributions to drilling technology innovation.

The awards cover: (1) Best Directional Drilling Solution for its proprietary rotary steerable system upgrades; (2) Digital Innovation of the Year for its real-time drilling analytics platform; and (3) Environmental Technology Award for its closed-loop drilling fluid management system.

"Innovation is how we stay ahead and deliver more value to our clients," said CTO Dr. Elena Sorokina. "These awards reflect the dedication of our R&D and operations teams."`,
  },
  {
    slug: "arctic-operations-expansion",
    date: "2025-12-05",
    category: "Operations",
    title: "GazStart Expands Arctic Drilling Capabilities",
    excerpt: "New equipment and trained crews ready for Yamal Peninsula operations.",
    content: `GazStart has completed a major investment in arctic-grade drilling equipment and specialized crew training, positioning the company for expanded operations on the Yamal Peninsula.

The $120 million investment includes two new arctic-spec drilling rigs, supporting equipment rated to -60°C, and a comprehensive training program for 350 crew members covering cold-weather operations, emergency response, and environmental protection.

Operations in the region will support development of new natural gas fields targeted for first production in 2027.`,
  },
  {
    slug: "esg-report-2025",
    date: "2025-11-18",
    category: "Sustainability",
    title: "GazStart Publishes Annual ESG Report",
    excerpt: "Demonstrating progress against environmental and social goals.",
    content: `GazStart has released its 2025 Environmental, Social, and Governance (ESG) Report, documenting the company's progress against its sustainability commitments.

Highlights include a 15% reduction in Scope 1 and 2 greenhouse gas emissions, a 22% increase in local community investment, and an industry-leading score on governance transparency metrics.

The report is prepared in accordance with GRI Standards and includes independent assurance of key environmental data. It is available for download on the company website.`,
  },
  {
    slug: "partnership-announcement",
    date: "2025-10-30",
    category: "Business",
    title: "Strategic Partnership with Leading Technology Provider",
    excerpt: "Collaboration will accelerate digital transformation in oilfield operations.",
    content: `GazStart and TechField Solutions have entered into a strategic partnership to accelerate the digital transformation of oilfield operations.

The partnership will integrate TechField's AI-powered predictive maintenance platform with GazStart's drilling operations, targeting a 20% reduction in unplanned downtime and a 15% improvement in drilling efficiency.

Pilot deployments will begin at five drilling rigs in Q1 2026, with full rollout planned by mid-year. The technology will be adapted for both onshore and offshore environments.`,
  },
];

export async function generateStaticParams() {
  return allNews.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = allNews.find((n) => n.slug === slug);
  if (!item) return {};
  return { title: item.title, description: item.excerpt };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const item = allNews.find((n) => n.slug === slug);
  if (!item) notFound();

  const t = await getTranslations({ locale, namespace: "common" });

  return (
    <>
      <Hero title={item.title} subtitle={item.excerpt} />
      <section className="bg-dark-900 py-24">
        <div className="mx-auto max-w-3xl px-4">
          <ScrollReveal>
            <div className="mb-8 flex items-center gap-3">
              <span className="rounded bg-primary-500/20 px-2 py-1 text-xs text-primary-400">
                {item.category}
              </span>
              <span className="text-sm text-white/40">{item.date}</span>
            </div>
            <div className="prose prose-invert max-w-none">
              {item.content.split("\n\n").map((para, i) => (
                <p key={i} className="mb-4 leading-relaxed text-white/70">
                  {para}
                </p>
              ))}
            </div>
            <div className="mt-12 border-t border-white/10 pt-6">
              <Link
                href={`/${locale}/press-center`}
                className="inline-flex items-center gap-2 text-sm text-primary-400 transition-colors hover:text-primary-300"
              >
                <svg
                  className="h-4 w-4 rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
                {t("backToList")}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
