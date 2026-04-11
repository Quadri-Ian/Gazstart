"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import introBackground from "@/assets/intro-background-xxxl-min.jpg";
import ScrollReveal from "@/components/ui/ScrollReveal";

const formatMetric = (value: number) => value.toLocaleString("en-US").replace(/,/g, " ");

export default function LocationsSection() {
  const t = useTranslations("home");
  const locale = useLocale();
  const [count, setCount] = useState(0);
  const metricRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) {
          return;
        }

        hasAnimated.current = true;
        const startTime = performance.now();
        const duration = 2200;
        const end = 6800000;

        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * end));

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
      },
      { threshold: 0.45 }
    );

    const node = metricRef.current;
    if (node) {
      observer.observe(node);
    }

    return () => observer.disconnect();
  }, []);

  const localePath = (path: string) => `/${locale}${path}`;
  const metricLabel = t("locationsMetricLabel").replace(/,\s*/g, ",\n");

  return (
    <section className="ui-dark-background py-28 md:py-36" id="geography">
      <div className="container-h">
        <div className="title-border">
          <h2 className="text-[32px] leading-none md:text-[44px] lg:text-[52px]">{t("locationsTitle")}</h2>
        </div>

        <div className="mb-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.94fr)] lg:items-start lg:gap-24">
          <div ref={metricRef}>
            <ScrollReveal>
              <div>
                <span className="geography__count">{formatMetric(count)}+</span>
                <span className="geography__count-title whitespace-pre-line">{metricLabel}</span>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.12} className="pt-3 lg:pt-0">
            <p className="geography__description max-w-[620px] text-white">{t("locationsDescription")}</p>
          </ScrollReveal>
        </div>

        <ScrollReveal className="relative min-h-[620px] pt-1 md:min-h-[740px] lg:min-h-[780px]">
          <div className="absolute right-0 top-[206px] h-[300px] w-[48%] overflow-hidden bg-white/10 md:top-[208px] md:h-[350px] md:w-[47%] lg:top-[214px] lg:h-[392px] lg:w-[48%]">
            <Image
              src={introBackground}
              alt={t("locationsProjectTitle")}
              fill
              className="object-cover object-[56%_50%]"
              sizes="(min-width: 1024px) 42vw, 100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,31,40,0.08)_0%,rgba(23,31,40,0.22)_100%)]" />
            <div className="absolute bottom-10 right-6 max-w-[320px] text-right text-white md:right-8 lg:bottom-12 lg:right-10">
              <p className="text-[17px] font-medium leading-tight md:text-[20px]">{t("locationsAreaTitle")}</p>
              <div className="mt-3 space-y-1 text-[15px] leading-[1.22] text-white/72 md:text-[17px]">
                {t("locationsAreaList").split("|").map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>
          </div>

          <svg viewBox="0 0 980 440" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-[7%] top-[6px] z-10 h-[332px] w-[72%] opacity-95 md:left-[9%] md:top-0 md:h-[396px] md:w-[74%] lg:left-[10%] lg:top-[-8px] lg:h-[454px] lg:w-[76%]" aria-hidden="true">
            <path d="M73.5 262.5L103 221L163 195L202.5 149.5L312.5 145L388.5 94L514.5 86.5L602.5 124.5L718 119L784.5 151.5L869 187L912 238.5L886.5 281.5L916 332L870 373L744 381L638.5 421L494 421L410.5 394L314 400.5L252.5 370L175 377.5L120 333L73.5 262.5Z" fill="rgba(32,45,57,0.92)" stroke="rgba(32,45,57,0.98)" strokeWidth="2" />
          </svg>

          <div className="absolute left-0 right-[69%] top-[284px] z-20 h-px bg-white/18 md:right-[69.5%] md:top-[286px] lg:right-[70%] lg:top-[294px]" />
          <div className="absolute left-[24.5%] top-[252px] z-20 flex h-[62px] w-[62px] items-center justify-center rounded-full bg-primary-600/78 md:left-[25%] md:top-[252px] md:h-[68px] md:w-[68px] lg:left-[26.5%] lg:top-[260px] lg:h-[72px] lg:w-[72px]">
            <div className="h-[8px] w-[8px] rounded-full bg-white" />
          </div>

          <div className="absolute left-1/2 top-[52px] z-20 flex h-[170px] w-[170px] -translate-x-1/2 items-center justify-center rounded-full bg-primary-600/78 md:top-[46px] md:h-[320px] md:w-[320px] lg:top-[42px] lg:h-[344px] lg:w-[344px]">
            <div className="h-[10px] w-[10px] rounded-full bg-white" />
          </div>
          <div className="absolute left-1/2 right-[8%] top-[206px] z-20 h-px bg-white/18 md:right-[7%] md:top-[206px] lg:right-[5%] lg:top-[214px]" />

          <div className="absolute left-0 top-[300px] z-20 max-w-[210px] text-white md:top-[308px] lg:top-[316px]">
            <p className="text-[17px] font-semibold leading-tight md:text-[19px]">{t("locationsHeadOfficeLabel")}</p>
            <p className="mt-1 text-[16px] leading-tight text-white/58 md:text-[18px]">{t("locationsHeadOfficeCity")}</p>
          </div>

          <Link
            href={localePath("/services/drilling")}
            className="absolute bottom-[44px] left-0 z-20 inline-flex items-center gap-4 text-[15px] text-white transition-opacity duration-300 hover:opacity-80 md:bottom-[54px] md:text-[16px] lg:bottom-[64px]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-dark-900">›</span>
            <span>{t("locationsProjectsCta")}</span>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}