"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import introBackground from "@/assets/intro-background-xxxl-min.jpg";
import ScrollReveal from "@/components/ui/ScrollReveal";
import useMobileHorizontalReveal from "@/components/ui/useMobileHorizontalReveal";

const formatMetric = (value: number) => value.toLocaleString("en-US").replace(/,/g, " ");

export default function LocationsSection() {
  const t = useTranslations("home");
  const locale = useLocale();
  const [count, setCount] = useState(0);
  const metricRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const metricRevealRef = useMobileHorizontalReveal<HTMLSpanElement>(96);

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
    <section className="ui-dark-background pb-0 pt-36 md:pb-0 md:pt-48 lg:pb-0 lg:pt-[13rem]" id="geography">
      <div className="container-h mx-auto max-w-[1680px] px-5 sm:px-[60px] lg:px-[150px]">
        <div className="title-border">
          <h2 className="text-[18px] leading-none md:text-[44px] lg:text-[52px]">{t("locationsTitle")}</h2>
        </div>

        <div className="mb-12 grid gap-10 md:mb-20 md:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.94fr)] lg:items-start lg:gap-24">
          <div ref={metricRef}>
            <ScrollReveal>
              <div className="overflow-hidden">
                <span
                  ref={metricRevealRef}
                  className="-ml-[8px] block whitespace-nowrap text-[92px] font-[330] leading-[0.84] tracking-[-0.09em] text-[#b4042f] md:ml-0 md:text-[80px] md:leading-[0.9] md:tracking-[-0.07em] lg:text-[80px]"
                >
                  {formatMetric(count)}+
                </span>
                <span className="mt-3 block whitespace-pre-line text-[13px] leading-[1.2] tracking-[-0.02em] text-white/56 md:mt-6 md:text-[16px] lg:mt-7 lg:text-[17px]">
                  {metricLabel}
                </span>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.12} className="pt-3 lg:pt-0">
            <p className="geography__description max-w-[540px] text-[15px] leading-[1.28] tracking-[-0.03em] text-white md:text-[16px] md:leading-[1.5] lg:text-[17px]">{t("locationsDescription")}</p>
          </ScrollReveal>
        </div>

        <ScrollReveal className="relative min-h-[500px] pt-4 md:min-h-[660px] lg:min-h-[700px]">
          <div className="absolute right-0 top-[206px] hidden h-[300px] w-[48%] overflow-hidden bg-white/10 md:block md:top-[208px] md:h-[350px] md:w-[47%] lg:top-[214px] lg:h-[392px] lg:w-[48%]">
            <Image
              src={introBackground}
              alt={t("locationsProjectTitle")}
              fill
              className="object-cover object-[56%_50%]"
              sizes="(min-width: 1024px) 42vw, 100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,31,40,0.08)_0%,rgba(23,31,40,0.22)_100%)]" />
            <div className="absolute bottom-10 right-6 max-w-[300px] text-right text-white md:right-8 lg:bottom-12 lg:right-10">
              <p className="text-[15px] font-medium leading-tight md:text-[16px] lg:text-[17px]">{t("locationsAreaTitle")}</p>
              <div className="mt-3 space-y-1 text-[13px] leading-[1.22] text-white/72 md:text-[14px] lg:text-[15px]">
                {t("locationsAreaList").split("|").map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute right-0 top-[18px] z-30 max-w-[128px] text-right text-white md:hidden">
            <p className="text-[12px] font-medium leading-[1.08] tracking-[-0.03em]">{t("locationsAreaTitle")}</p>
            <div className="mt-2 space-y-1 text-[11px] leading-[1.1] tracking-[-0.03em] text-white/72">
              {t("locationsAreaList").split("|").map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>

          {/* Nigeria map */}
          <svg viewBox="0 0 980 440" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-[4%] top-[94px] z-10 h-[248px] w-[92%] opacity-95 md:left-[9%] md:top-0 md:h-[396px] md:w-[74%] lg:left-[10%] lg:top-[-8px] lg:h-[454px] lg:w-[76%]" aria-hidden="true">
            <path d="M90,325 L140,320 L162,318 L188,356 L240,378 L288,400 L352,412 L418,410 L452,406 L492,406 L516,398 L572,378 L584,340 L598,302 L618,262 L652,242 L718,224 L784,184 L816,164 L876,126 L890,106 L890,84 L850,58 L784,54 L650,46 L584,46 L480,40 L364,40 L248,36 L172,36 L134,44 L94,54 L56,74 L38,110 L34,170 L34,234 L90,325 Z" fill="rgba(32,45,57,0.92)" stroke="rgba(32,45,57,0.98)" strokeWidth="2" />
          </svg>

          <div className="absolute left-0 top-[296px] z-30 h-px w-[calc(21%+18px)] bg-white/22 md:top-[280px] md:w-[calc(22.5%+29px)] lg:top-[290px] lg:w-[calc(24%+31px)]" />
          <div className="absolute left-[21%] top-[278px] z-20 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[rgba(194,9,52,0.9)] shadow-[0_0_0_1px_rgba(255,255,255,0.04)] md:left-[22.5%] md:top-[251px] md:h-[58px] md:w-[58px] lg:left-[24%] lg:top-[259px] lg:h-[62px] lg:w-[62px]">
            <div className="relative z-10 h-[8px] w-[8px] rounded-full bg-white" />
          </div>

          <div className="absolute left-[44%] top-[196px] z-20 flex h-[138px] w-[138px] -translate-x-1/2 items-center justify-center rounded-full bg-[rgba(194,9,52,0.88)] shadow-[0_0_0_1px_rgba(255,255,255,0.03)] md:left-[46%] md:top-[70px] md:h-[282px] md:w-[282px] lg:top-[62px] lg:h-[304px] lg:w-[304px]">
            <div className="relative z-10 h-[10px] w-[10px] rounded-full bg-white" />
          </div>
          <div className="absolute left-[44%] right-0 top-[264px] z-30 h-px bg-white/18 md:left-[46%] md:top-[211px] lg:top-[214px]" />

          <div className="absolute left-[28px] top-[248px] z-20 max-w-[124px] text-white md:left-0 md:top-[294px] md:max-w-[220px] lg:top-[302px]">
            <p className="text-[11px] font-semibold leading-[1.04] tracking-[-0.03em] md:text-[15px] lg:text-[16px]">{t("locationsHeadOfficeLabel")}</p>
            <p className="mt-1 text-[11px] leading-[1.08] tracking-[-0.02em] text-white/74 md:text-[14px] lg:text-[15px]">{t("locationsHeadOfficeCity")}</p>
          </div>

          <Link
            href={localePath("/services/drilling")}
            className="absolute left-0 top-[436px] z-20 inline-flex items-center gap-3 text-[12px] text-white transition-opacity duration-300 hover:opacity-80 md:top-[542px] md:text-[13px] lg:top-[590px]"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[14px] text-dark-900">›</span>
            <span>{t("locationsProjectsCta")}</span>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}