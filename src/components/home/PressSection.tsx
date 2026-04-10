"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";

type Category = "all" | "news" | "press" | "announcements";

interface NewsItem {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  category: Category;
  /* gradient used as placeholder image */
  gradient: string;
}

const news: NewsItem[] = [
  {
    slug: "gazstart-secures-new-contracts",
    date: "15 Mar 2026",
    title: "GazStart Secures Major Drilling Contracts in Western Siberia",
    excerpt:
      "The company announces new multi-year agreements with leading energy producers, reinforcing its position as a top-tier drilling services partner.",
    category: "news",
    gradient: "from-[#1a2530] to-[#394854]",
  },
  {
    slug: "safety-milestone-2025",
    date: "20 Feb 2026",
    title: "GazStart Achieves Record Safety Milestone in 2025",
    excerpt:
      "Our operations recorded the lowest incident rate in company history, reflecting our unwavering commitment to worker safety.",
    category: "press",
    gradient: "from-[#2a1a1a] to-[#5c2a2a]",
  },
  {
    slug: "technology-innovation-awards",
    date: "10 Jan 2026",
    title: "Innovation Awards Recognise GazStart Technology Advances",
    excerpt:
      "The company received three industry awards for its pioneering work in directional drilling technology and real-time data analytics.",
    category: "announcements",
    gradient: "from-[#1a2a1a] to-[#2a4a2a]",
  },
  {
    slug: "new-yamal-project",
    date: "05 Jan 2026",
    title: "New LNG Infrastructure Project Launched on Yamal Peninsula",
    excerpt:
      "GazStart begins construction phase of a major LNG supporting infrastructure project on the Yamal Peninsula.",
    category: "news",
    gradient: "from-[#1a1a2a] to-[#2a2a5c]",
  },
  {
    slug: "annual-report-2025",
    date: "02 Jan 2026",
    title: "Annual Report 2025: Record Revenues and Expanded Footprint",
    excerpt:
      "Full-year 2025 results show record revenues, expanded operational footprint, and continued investment in technology.",
    category: "press",
    gradient: "from-[#2a2a1a] to-[#4a4a1a]",
  },
  {
    slug: "recruitment-drive",
    date: "15 Dec 2025",
    title: "GazStart Launches Nationwide Recruitment Drive",
    excerpt:
      "Seeking over 400 skilled professionals for roles across drilling, engineering, HSE, and corporate functions.",
    category: "announcements",
    gradient: "from-[#1a2a2a] to-[#1a4a4a]",
  },
];

export default function PressSection() {
  const t = useTranslations("home");
  const locale = useLocale();
  const [activeFilter, setActiveFilter] = useState<Category | "all">("all");

  const filters: { key: Category | "all"; label: string }[] = [
    { key: "all", label: t("pressFilterAll") },
    { key: "news", label: t("pressFilterNews") },
    { key: "press", label: t("pressFilterPress") },
    { key: "announcements", label: t("pressFilterAnnouncements") },
  ];

  const filtered = activeFilter === "all" ? news : news.filter((n) => n.category === activeFilter);

  return (
    <section className="w-full bg-brand-dark py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Header row */}
        <ScrollReveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-brand-red">Media</p>
            <h2 className="text-3xl font-bold text-white md:text-4xl">{t("pressTitle")}</h2>
          </div>
          <Link
            href={`/${locale}/press-center`}
            className="flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-white"
          >
            {t("pressViewAll")}
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </ScrollReveal>

        {/* Pill filters */}
        <ScrollReveal delay={0.05} className="mb-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all ${
                activeFilter === f.key
                  ? "border-brand-red bg-brand-red text-white"
                  : "border-white/20 text-white/50 hover:border-white/40 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </ScrollReveal>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => (
            <ScrollReveal key={item.slug} delay={i * 0.06}>
              <Link
                href={`/${locale}/press-center/${item.slug}`}
                className="press-card group flex flex-col overflow-hidden border border-white/10 bg-brand-card transition-all hover:border-brand-red/30"
              >
                {/* Image reveal on hover */}
                <div className="press-card-image">
                  <div className={`h-40 w-full bg-gradient-to-br ${item.gradient}`} />
                </div>

                {/* Card body */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="rounded-full bg-brand-dark/10 px-2.5 py-0.5 text-xs font-medium text-brand-dark/60 capitalize">
                      {item.category}
                    </span>
                    <time className="text-xs text-brand-dark/40">{item.date}</time>
                  </div>
                  <h3 className="text-sm font-semibold leading-snug text-brand-dark transition-colors group-hover:text-brand-red">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-brand-dark/55">
                    {item.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs text-brand-red">
                    {t("pressViewAll")}
                    <svg
                      className="h-3 w-3 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
