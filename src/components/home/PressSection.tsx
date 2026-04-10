import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";

const news = [
  {
    slug: "gazstart-secures-new-contracts",
    date: "2026-03-15",
    title: "GazStart Secures Major Drilling Contracts in Western Siberia",
    excerpt:
      "The company announces new multi-year agreements with leading energy producers, reinforcing its position as a top-tier drilling services partner.",
  },
  {
    slug: "safety-milestone-2025",
    date: "2026-02-20",
    title: "GazStart Achieves Record Safety Milestone in 2025",
    excerpt:
      "Our operations recorded the lowest incident rate in company history, reflecting our unwavering commitment to worker safety and responsible operations.",
  },
  {
    slug: "technology-innovation-awards",
    date: "2026-01-10",
    title: "Innovation Awards Recognize GazStart Technology Advances",
    excerpt:
      "The company received three industry awards for its pioneering work in directional drilling technology and real-time data analytics.",
  },
];

export default function PressSection() {
  const t = useTranslations("home");
  const locale = useLocale();

  return (
    <section className="bg-dark-800 py-24">
      <div className="mx-auto max-w-7xl px-4">
        <ScrollReveal className="mb-12 flex items-end justify-between">
          <div>
            <p className="mb-2 text-xs uppercase tracking-widest text-primary-500">News</p>
            <h2 className="text-3xl font-bold text-white">{t("pressTitle")}</h2>
          </div>
          <Link
            href={`/${locale}/press-center`}
            className="flex items-center gap-1 text-sm text-primary-400 transition-colors hover:text-primary-300"
          >
            {t("pressViewAll")}
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {news.map((item, i) => (
            <ScrollReveal key={item.slug} delay={i * 0.1}>
              <Link
                href={`/${locale}/press-center/${item.slug}`}
                className="group block rounded-lg border border-white/10 bg-dark-900 p-6 transition-colors hover:border-primary-500/30"
              >
                <p className="mb-3 text-xs text-white/40">{item.date}</p>
                <h3 className="font-semibold leading-snug text-white transition-colors group-hover:text-primary-400">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{item.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs text-primary-500">
                  Read more
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
  );
}
