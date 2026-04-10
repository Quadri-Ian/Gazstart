"use client";

import Link from "next/link";
import { useState } from "react";
import { useLocale } from "next-intl";

type Tab = "news" | "events" | "media";

const articles: Record<Tab, { slug: string; title: string; day: string; month: string; year: string }[]> = {
  news: [
    {
      slug: "gazstart-secures-new-contracts",
      title: "GazStart Secures Major Drilling Contracts in Western Siberia",
      day: "15",
      month: "Mar",
      year: "2026",
    },
    {
      slug: "safety-milestone-2025",
      title: "GazStart Achieves Record Safety Milestone in 2025",
      day: "20",
      month: "Feb",
      year: "2026",
    },
    {
      slug: "technology-innovation-awards",
      title: "Innovation Awards Recognize GazStart Technology Advances",
      day: "10",
      month: "Jan",
      year: "2026",
    },
  ],
  events: [
    {
      slug: "annual-conference-2026",
      title: "GazStart Annual Industry Conference and Exhibition",
      day: "05",
      month: "Apr",
      year: "2026",
    },
    {
      slug: "field-day-siberia",
      title: "Western Siberia Field Day — Open Rig Tours for Partners",
      day: "18",
      month: "Mar",
      year: "2026",
    },
    {
      slug: "safety-training-day",
      title: "Company-Wide Safety Training and Certification Day",
      day: "28",
      month: "Feb",
      year: "2026",
    },
  ],
  media: [
    {
      slug: "forbes-feature-2026",
      title: "Forbes Russia Features GazStart as Top Drilling Contractor",
      day: "12",
      month: "Mar",
      year: "2026",
    },
    {
      slug: "rbc-interview",
      title: "CEO Interview with RBC on Growth Strategy and Investments",
      day: "03",
      month: "Mar",
      year: "2026",
    },
    {
      slug: "vedomosti-analysis",
      title: "Vedomosti Analysis: GazStart Market Position in 2026",
      day: "14",
      month: "Feb",
      year: "2026",
    },
  ],
};

const tabs: { key: Tab; label: string }[] = [
  { key: "news", label: "News" },
  { key: "events", label: "Events" },
  { key: "media", label: "In the Media" },
];

export default function PressSection() {
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState<Tab>("news");

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-h">
        {/* Title */}
        <div className="title-border title-border--grey">
          <h2>Press-center</h2>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`press-tab-btn${activeTab === tab.key ? " is-active" : ""}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {articles[activeTab].map((item) => (
            <Link
              key={item.slug}
              href={`/${locale}/press-center/${item.slug}`}
              className="card-article"
            >
              {/* Default layer */}
              <div className="card-article__layer">
                <h5 className="card-article__title">{item.title}</h5>
                <div className="card-article__bottom">
                  <div className="flex items-end justify-between">
                    <time className="card-article__day">{item.day}</time>
                    <div className="card-article__small text-right">
                      <p>{item.month}</p>
                      <p>{item.year}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover layer */}
              <div className="card-article__hover">
                <div className="card-article__hover__background">
                  {/* Dark bg for hover — no image available */}
                  <div className="absolute inset-0 bg-[#0e1a27]" />
                </div>
                <div className="card-article__hover__content">
                  <h5 className="card-article__title">{item.title}</h5>
                  <div className="card-article__bottom">
                    <div className="flex items-end justify-between">
                      <time className="card-article__day">{item.day}</time>
                      <div className="card-article__small text-right">
                        <p>{item.month}</p>
                        <p>{item.year}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View all link */}
        <div className="mt-10 border-t border-black/10 pt-6">
          <Link
            href={`/${locale}/press-center`}
            className="inline-flex items-center gap-2 text-sm text-[#0e1a27]/60 hover:text-[#0e1a27] transition-colors"
            style={{ letterSpacing: "-0.01em" }}
          >
            View all
            <svg width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden="true">
              <path d="M1 4h12M9 1l4 3-4 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
