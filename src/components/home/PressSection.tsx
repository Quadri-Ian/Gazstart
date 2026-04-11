"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";

type Tab = "news" | "events" | "media";

type Article = {
  slug: string;
  title: string;
  day: string;
  month: string;
  year: string;
  imageUrl?: string;
};

const articles: Record<Tab, Article[]> = {
  news: [
    {
      slug: "naftagaz-held-a-2024-professional-skills-contest",
      title: "Every year this landmark event brings together the drilling crews to test their strengths and hone their skills.",
      day: "27",
      month: "Aug",
      year: "2024",
      imageUrl: "https://naftagaz.com/upload/resize_cache/iblock/be3/422_346_0/k2h2nz59xgt5ep6thz80hms119bda4m3.jpg",
    },
    {
      slug: "naftagaz-razvitie-training-center",
      title: "NaftaGaz-Razvitie Training Center Accredited by the Oil and Gas Cluster Association",
      day: "22",
      month: "Aug",
      year: "2024",
    },
    {
      slug: "tsyfrovoye-burenie",
      title: "Tsyfrovoye Bureniye Presented the Prospects of ADC Upgrading to Partners",
      day: "12",
      month: "Aug",
      year: "2024",
    },
    {
      slug: "summer-expedition",
      title: "Summer Expedition to Study the Caspian Seal is Set to Start",
      day: "29",
      month: "Jul",
      year: "2024",
    },
    {
      slug: "regional-awards",
      title: "Regional Industry Awards Recognized the Best Crew Training Practices",
      day: "18",
      month: "Jul",
      year: "2024",
    },
    {
      slug: "new-base",
      title: "New Production Base Facilities Expand Readiness for the Season",
      day: "09",
      month: "Jul",
      year: "2024",
    },
  ],
  events: [
    {
      slug: "industry-forum",
      title: "Annual Industry Forum Will Bring Together Drilling, Service, and Safety Teams",
      day: "05",
      month: "Sep",
      year: "2024",
    },
    {
      slug: "field-training-week",
      title: "Field Training Week Opens New Practical Sessions for Young Specialists",
      day: "18",
      month: "Aug",
      year: "2024",
    },
    {
      slug: "regional-showcase",
      title: "Regional Operations Showcase Will Present New Equipment and Crew Competencies",
      day: "08",
      month: "Aug",
      year: "2024",
    },
    {
      slug: "logistics-meetup",
      title: "Logistics and Production Meetup Scheduled for Northern Asset Managers",
      day: "30",
      month: "Jul",
      year: "2024",
    },
    {
      slug: "crew-marathon",
      title: "Crew Competence Marathon Announced for Training Grounds in August",
      day: "17",
      month: "Jul",
      year: "2024",
    },
    {
      slug: "open-day",
      title: "Open Day for Technical Partners Will Cover Service and Safety Programs",
      day: "11",
      month: "Jul",
      year: "2024",
    },
  ],
  media: [
    {
      slug: "industry-review",
      title: "Industry Review Highlights the Company’s Competence in High-Complexity Wells",
      day: "11",
      month: "Sep",
      year: "2024",
    },
    {
      slug: "expert-opinion",
      title: "Experts Discuss the Modernization of Automated Drilling Control Systems",
      day: "02",
      month: "Aug",
      year: "2024",
    },
    {
      slug: "environment-feature",
      title: "Environmental Projects and Safety Standards Remain a Key Topic in Sector Media",
      day: "21",
      month: "Jul",
      year: "2024",
    },
    {
      slug: "training-center-feature",
      title: "Training Center Development and Internal Education Programs Featured by Trade Media",
      day: "15",
      month: "Jul",
      year: "2024",
    },
    {
      slug: "production-review",
      title: "Production Review Notes Stable Performance and Strong Crew Discipline",
      day: "08",
      month: "Jul",
      year: "2024",
    },
    {
      slug: "expert-roundup",
      title: "Expert Roundup Focuses on Automation, Reliability, and Workforce Development",
      day: "03",
      month: "Jul",
      year: "2024",
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const update = () => {
      setCanScrollPrev(element.scrollLeft > 8);
      setCanScrollNext(element.scrollLeft + element.clientWidth < element.scrollWidth - 8);
    };

    update();
    element.scrollTo({ left: 0, behavior: "smooth" });
    element.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      element.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [activeTab]);

  const handleScroll = (direction: "prev" | "next") => {
    const element = scrollRef.current;
    if (!element) return;

    element.scrollBy({
      left: direction === "next" ? 320 : -320,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-white py-16 md:py-24 xl:py-28">
      <div className="mx-auto w-full max-w-[1680px] px-5 md:px-[60px] lg:px-[150px]">
        <div className="title-border title-border--grey">
          <h2>Press-center</h2>
        </div>

        <div className="mb-8 flex flex-col gap-5 md:mb-10 lg:mb-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2 md:gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`press-tab-btn rounded-full px-5 py-2.5 text-[12px] md:px-7 md:py-3 md:text-[13px] ${activeTab === tab.key ? "is-active" : ""}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="hidden items-center gap-3 self-end lg:flex lg:self-auto">
            <button
              type="button"
              aria-label="Previous press items"
              disabled={!canScrollPrev}
              onClick={() => handleScroll("prev")}
              className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-black/5 bg-[#f6f6f7] text-[#1e2e40]/35 transition-colors duration-300 hover:bg-[#b4042f] hover:text-white disabled:cursor-default disabled:bg-[#f6f6f7] disabled:text-[#1e2e40]/20 disabled:hover:bg-[#f6f6f7] disabled:hover:text-[#1e2e40]/20"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3 w-3 rotate-180" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m13 5 7 7-7 7" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next press items"
              disabled={!canScrollNext}
              onClick={() => handleScroll("next")}
              className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#435465] text-white transition-colors duration-300 hover:bg-[#b4042f] disabled:cursor-default disabled:bg-[#e9ecef] disabled:text-[#435465]/35 disabled:hover:bg-[#e9ecef]"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m13 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:gap-5 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {articles[activeTab].map((item) => (
            <Link
              key={item.slug}
              href={`/${locale}/press-center`}
              className="group relative block h-[302px] min-w-[250px] snap-start overflow-hidden border border-black/5 bg-[#f8f8f9] md:h-[326px] md:min-w-[286px]"
            >
              <div className="absolute inset-0 overflow-hidden">
                {item.imageUrl ? (
                  <>
                    <div
                      className="absolute inset-0 translate-y-full bg-cover bg-center transition-transform duration-700 ease-[cubic-bezier(0.25,0.74,0.22,0.99)] group-hover:translate-y-0"
                      style={{ backgroundImage: `url(${item.imageUrl})` }}
                    />
                    <div className="absolute inset-0 translate-y-full bg-[linear-gradient(180deg,rgba(17,30,42,0.12)_0%,rgba(17,30,42,0.46)_100%)] transition-transform duration-700 ease-[cubic-bezier(0.25,0.74,0.22,0.99)] group-hover:translate-y-0" />
                  </>
                ) : null}
              </div>

              <div className="relative flex h-full flex-col justify-between px-4 py-4 md:px-6 md:py-6">
                <h3 className={`max-w-[214px] text-[14px] leading-[1.1] tracking-[-0.035em] text-[#394854] transition-colors duration-500 md:max-w-[228px] md:text-[15px] ${item.imageUrl ? "group-hover:text-white" : ""}`}>
                  {item.title}
                </h3>

                <div className={`flex items-end justify-between border-t border-black/10 pt-4 transition-colors duration-500 md:pt-5 ${item.imageUrl ? "group-hover:border-white/25" : ""}`}>
                  <time className={`text-[52px] leading-[0.84] tracking-[-0.075em] text-[#b4042f] transition-colors duration-500 md:text-[58px] ${item.imageUrl ? "group-hover:text-white" : ""}`}>
                    {item.day}
                  </time>
                  <div className={`pb-1 text-right text-[11px] leading-[1.02] tracking-[-0.03em] text-[#435465]/72 transition-colors duration-500 ${item.imageUrl ? "group-hover:text-white/78" : ""}`}>
                    <p>{item.month}</p>
                    <p>{item.year}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
