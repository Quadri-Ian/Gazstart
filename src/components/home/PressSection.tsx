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
      left: direction === "next" ? 388 : -388,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-white py-20 md:py-24 xl:py-28">
      <div className="container-h">
        <div className="title-border title-border--grey">
          <h2>Press-center</h2>
        </div>

        <div className="mb-12 flex flex-col gap-8 lg:mb-14 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2.5 md:gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`press-tab-btn rounded-full px-8 py-4 text-[14px] tracking-[-0.02em] ${activeTab === tab.key ? "is-active" : ""}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 self-end lg:self-auto">
            <button
              type="button"
              aria-label="Previous press items"
              disabled={!canScrollPrev}
              onClick={() => handleScroll("prev")}
              className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#f6f6f7] text-[#1e2e40]/35 transition-colors disabled:cursor-default disabled:bg-[#f6f6f7] disabled:text-[#1e2e40]/20"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 rotate-180" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m13 5 7 7-7 7" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next press items"
              disabled={!canScrollNext}
              onClick={() => handleScroll("next")}
              className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#435465] text-white transition-colors hover:bg-[#384755] disabled:cursor-default disabled:bg-[#e9ecef] disabled:text-[#435465]/35"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m13 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory gap-8 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {articles[activeTab].map((item) => (
            <Link
              key={item.slug}
              href={`/${locale}/press-center`}
              className={`relative block h-[388px] min-w-[320px] snap-start overflow-hidden border border-black/5 bg-[#f8f8f9] md:min-w-[356px] ${item.imageUrl ? "text-white" : "text-[#394854]"}`}
            >
              {item.imageUrl ? (
                <>
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.imageUrl})` }}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,30,42,0.18)_0%,rgba(17,30,42,0.42)_100%)]" />
                </>
              ) : null}

              <div className="relative flex h-full flex-col justify-between px-8 py-7 md:px-9 md:py-8">
                <h3 className={`max-w-[286px] text-[18px] leading-[1.12] tracking-[-0.04em] ${item.imageUrl ? "text-white" : "text-[#394854]"}`}>
                  {item.title}
                </h3>

                <div className={`flex items-end justify-between border-t pt-6 ${item.imageUrl ? "border-white/25" : "border-black/10"}`}>
                  <time className={`text-[76px] leading-[0.85] tracking-[-0.07em] ${item.imageUrl ? "text-white" : "text-[#b4042f]"}`}>
                    {item.day}
                  </time>
                  <div className={`pb-1 text-right text-[14px] leading-[1.05] tracking-[-0.03em] ${item.imageUrl ? "text-white/75" : "text-[#435465]/75"}`}>
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
