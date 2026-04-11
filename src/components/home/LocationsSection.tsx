"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import introBackground from "@/assets/intro-background-xxxl-min.jpg";
import ScrollReveal from "@/components/ui/ScrollReveal";

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
                <span className="geography__count">{count.toLocaleString("en-US")}+</span>
                <span className="geography__count-title">{t("locationsMetricLabel")}</span>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.12} className="pt-3 lg:pt-0">
            <p className="geography__description max-w-[620px] text-white">{t("locationsDescription")}</p>
          </ScrollReveal>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:items-start lg:gap-0">
          <ScrollReveal className="relative min-h-[520px] overflow-hidden pt-6 md:min-h-[600px]">
            <div className="absolute left-0 right-[14%] top-[24%] h-px bg-white/14" />
            <div className="absolute left-[27%] top-[24%] h-[64px] w-[64px] rounded-full bg-primary-600 md:h-[66px] md:w-[66px]" />
            <div className="absolute left-[51%] top-[8%] h-[160px] w-[160px] rounded-full bg-primary-600/95 md:h-[320px] md:w-[320px]" />
            <div className="absolute left-[50.5%] right-[0%] top-[8%] h-px bg-white/14" />
            <div className="absolute left-[50.5%] top-[8%] h-[10px] w-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />

            <svg viewBox="0 0 980 440" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-[92px] left-[18%] h-[330px] w-[78%] opacity-95 md:bottom-[96px] md:h-[390px]" aria-hidden="true">
              <path d="M73.5 262.5L103 221L163 195L202.5 149.5L312.5 145L388.5 94L514.5 86.5L602.5 124.5L718 119L784.5 151.5L869 187L912 238.5L886.5 281.5L916 332L870 373L744 381L638.5 421L494 421L410.5 394L314 400.5L252.5 370L175 377.5L120 333L73.5 262.5Z" fill="rgba(32,45,57,0.72)" stroke="rgba(32,45,57,0.92)" strokeWidth="2" />
            </svg>

            <div className="absolute left-0 top-[calc(24%-18px)] max-w-[180px] text-white">
              <p className="text-[15px] font-medium leading-tight">{t("locationsHeadOfficeLabel")}</p>
              <p className="mt-1 text-[15px] leading-tight text-white/52">{t("locationsHeadOfficeCity")}</p>
            </div>

            <Link
              href={localePath("/services/drilling")}
              className="absolute bottom-[112px] left-0 inline-flex items-center gap-4 text-[15px] text-white transition-opacity duration-300 hover:opacity-80"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-dark-900">›</span>
              <span>{t("locationsProjectsCta")}</span>
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.16} direction="left" className="relative min-h-[520px] pt-6 md:min-h-[600px] lg:pl-10">
            <div className="relative ml-auto h-[300px] w-full max-w-[600px] overflow-hidden bg-white/10 md:h-[356px]">
              <Image
                src={introBackground}
                alt={t("locationsProjectTitle")}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 42vw, 100vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(57,72,84,0.12)_0%,rgba(57,72,84,0.18)_100%)]" />
              <div className="absolute bottom-8 right-6 max-w-[290px] text-right text-white md:right-10">
                <p className="text-[18px] leading-tight">{t("locationsAreaTitle")}</p>
                <div className="mt-2 space-y-1 text-[17px] leading-[1.25] text-white/64">
                  {t("locationsAreaList").split("|").map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}