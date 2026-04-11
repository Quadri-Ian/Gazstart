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

  return (
    <section className="ui-dark-background py-28 md:py-36" id="geography">
      <div className="container-h">
        <div className="title-border">
          <h2>{t("locationsTitle")}</h2>
        </div>

        <div className="mb-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.94fr)] lg:items-start lg:gap-24">
          <div ref={metricRef}>
            <ScrollReveal>
              <div>
                <span className="geography__count">{formatMetric(count)}+</span>
                <span className="geography__count-title">{t("locationsMetricLabel")}</span>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.12} className="pt-3 lg:pt-0">
            <p className="geography__description max-w-[620px] text-white">{t("locationsDescription")}</p>
          </ScrollReveal>
        </div>

        <ScrollReveal className="relative min-h-[560px] pt-2 md:min-h-[700px] lg:min-h-[760px]">
          <div className="absolute right-0 top-[108px] h-[318px] w-[50%] overflow-hidden bg-white/10 md:top-[72px] md:h-[410px] md:w-[52%] lg:top-[46px] lg:h-[472px]">
            <Image
              src={introBackground}
              alt={t("locationsProjectTitle")}
              fill
              className="object-cover object-[56%_42%]"
              sizes="(min-width: 1024px) 42vw, 100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,31,40,0.08)_0%,rgba(23,31,40,0.22)_100%)]" />
            <div className="absolute bottom-10 right-6 max-w-[320px] text-right text-white md:right-10 lg:bottom-12 lg:right-12">
              <p className="text-[18px] leading-tight md:text-[22px]">{t("locationsAreaTitle")}</p>
              <div className="mt-3 space-y-1 text-[15px] leading-[1.25] text-white/64 md:text-[18px]">
                {t("locationsAreaList").split("|").map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute left-0 right-[10%] top-[144px] h-px bg-white/16 md:top-[126px] lg:top-[118px]" />
          <div className="absolute left-[22%] top-[111px] z-20 h-[66px] w-[66px] rounded-full bg-primary-600 md:left-[24%] md:top-[92px] md:h-[82px] md:w-[82px] lg:left-[25.2%] lg:top-[77px] lg:h-[92px] lg:w-[92px]" />
          <div className="absolute left-[48%] right-0 top-[78px] z-20 h-px bg-white/16 md:left-[49.5%] md:top-[60px] lg:left-[50.5%] lg:top-[52px]" />
          <div className="absolute left-[48%] top-[78px] z-20 h-[10px] w-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white md:left-[49.5%] md:top-[60px] lg:left-[50.5%] lg:top-[52px]" />

          <svg viewBox="0 0 980 440" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-[84px] left-[11%] z-10 h-[336px] w-[82%] opacity-95 md:bottom-[78px] md:left-[13%] md:h-[410px] md:w-[79%] lg:bottom-[72px] lg:left-[15.5%] lg:h-[452px] lg:w-[76%]" aria-hidden="true">
            <path d="M73.5 262.5L103 221L163 195L202.5 149.5L312.5 145L388.5 94L514.5 86.5L602.5 124.5L718 119L784.5 151.5L869 187L912 238.5L886.5 281.5L916 332L870 373L744 381L638.5 421L494 421L410.5 394L314 400.5L252.5 370L175 377.5L120 333L73.5 262.5Z" fill="rgba(32,45,57,0.92)" stroke="rgba(32,45,57,0.98)" strokeWidth="2" />
          </svg>

          <div className="absolute left-[43.5%] top-[36px] z-20 h-[174px] w-[174px] rounded-full bg-primary-600/95 md:left-[45.5%] md:top-[8px] md:h-[318px] md:w-[318px] lg:left-[46.2%] lg:top-0 lg:h-[344px] lg:w-[344px]" />

          <div className="absolute left-0 top-[126px] z-20 max-w-[210px] text-white md:top-[108px] lg:top-[100px]">
            <p className="text-[15px] font-medium leading-tight md:text-[17px]">{t("locationsHeadOfficeLabel")}</p>
            <p className="mt-1 text-[15px] leading-tight text-white/52 md:text-[17px]">{t("locationsHeadOfficeCity")}</p>
          </div>

          <Link
            href={localePath("/services/drilling")}
            className="absolute bottom-[120px] left-0 z-20 inline-flex items-center gap-4 text-[15px] text-white transition-opacity duration-300 hover:opacity-80 md:bottom-[104px] md:text-[16px] lg:bottom-[110px]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-dark-900">›</span>
            <span>{t("locationsProjectsCta")}</span>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}