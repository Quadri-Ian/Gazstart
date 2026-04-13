import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Hero from "@/components/ui/Hero";
import ScrollReveal from "@/components/ui/ScrollReveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pressCenter" });
  return { title: t("title") };
}

const allNews = [
  {
    slug: "blueflare-secures-new-contracts",
    date: "2026-03-15",
    category: "Business",
    title: "Blueflare Energy Secures Major Drilling Contracts in the Niger Delta",
    excerpt: "The company announces new multi-year agreements with leading energy producers.",
  },
  {
    slug: "safety-milestone-2025",
    date: "2026-02-20",
    category: "Safety",
    title: "Blueflare Energy Achieves Record Safety Milestone in 2025",
    excerpt: "Our operations recorded the lowest incident rate in company history.",
  },
  {
    slug: "technology-innovation-awards",
    date: "2026-01-10",
    category: "Innovation",
    title: "Innovation Awards Recognize Blueflare Energy Technology Advances",
    excerpt: "Three industry awards for pioneering work in directional drilling technology.",
  },
  {
    slug: "arctic-operations-expansion",
    date: "2025-12-05",
    category: "Operations",
    title: "Blueflare Energy Expands Arctic Drilling Capabilities",
    excerpt: "New rigs and trained crews ready for deepwater Niger Delta operations.",
  },
  {
    slug: "esg-report-2025",
    date: "2025-11-18",
    category: "Sustainability",
    title: "Blueflare Energy Publishes Annual ESG Report",
    excerpt: "Demonstrating progress against environmental and social goals.",
  },
  {
    slug: "partnership-announcement",
    date: "2025-10-30",
    category: "Business",
    title: "Strategic Partnership with Leading Technology Provider",
    excerpt: "Collaboration will accelerate digital transformation in oilfield operations.",
  },
];

export default async function PressCenterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pressCenter" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  return (
    <>
      <Hero title={t("heroTitle")} subtitle={t("heroSubtitle")} />
      <section className="bg-dark-900 py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allNews.map((item, i) => (
              <ScrollReveal key={item.slug} delay={i * 0.05}>
                <Link
                  href={`/${locale}/press-center/${item.slug}`}
                  className="group block h-full rounded-lg border border-white/10 bg-dark-800 p-6 transition-colors hover:border-primary-500/30"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="rounded bg-primary-500/20 px-2 py-1 text-xs text-primary-400">
                      {item.category}
                    </span>
                    <span className="text-xs text-white/40">{item.date}</span>
                  </div>
                  <h3 className="font-semibold leading-snug text-white transition-colors group-hover:text-primary-400">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-white/60">{item.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs text-primary-500">
                    {tCommon("readMore")}
                    <svg
                      className="h-3 w-3 transition-transform group-hover:translate-x-1"
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
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
