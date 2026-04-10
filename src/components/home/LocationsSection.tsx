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
    <section className="ui-dark-background py-20 md:py-28" id="geography">
      <div className="container-h">
        <div className="title-border">
          <h2>{t("locationsTitle")}</h2>
        </div>

        <div className="mb-14 grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.95fr)] lg:items-end lg:gap-20">
          <div ref={metricRef}>
            <ScrollReveal>
              <div className="flex flex-col gap-5">
                <div>
                  <span className="geography__count">{count.toLocaleString("en-US")}+</span>
                  <span className="geography__count-title">{t("locationsMetricLabel")}</span>
                </div>
                <p className="max-w-[520px] text-[13px] uppercase tracking-[0.22em] text-white/35">
                  {t("locationsSubtitle")}
                </p>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.12} className="flex flex-col gap-8 lg:pb-3">
            <p className="geography__description max-w-[560px]">{t("locationsDescription")}</p>
            <div className="flex flex-wrap items-center gap-5">
              <Link
                href={localePath("/services/drilling")}
                className="inline-flex items-center gap-3 rounded-full border border-white/18 px-5 py-3 text-[13px] uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:border-white/40 hover:bg-white/8"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-600 text-[12px] text-white">
                  →
                </span>
                <span>{t("locationsProjectsCta")}</span>
              </Link>
              <p className="max-w-[260px] text-[13px] leading-6 text-white/42">{t("locationsMapCaption")}</p>
            </div>
          </ScrollReveal>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)]">
          <ScrollReveal className="relative overflow-hidden rounded-[34px] border border-white/8 bg-[#435361] px-6 py-8 shadow-[0_30px_80px_rgba(0,0,0,0.2)] md:px-10 md:py-12">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_75%_65%,rgba(171,5,45,0.18),transparent_28%)]" />
            <div className="relative mb-6 flex items-center justify-between gap-4">
              <p className="text-[12px] uppercase tracking-[0.24em] text-white/38">{t("locationsMapCaption")}</p>
              <span className="rounded-full border border-white/12 px-4 py-1.5 text-[12px] uppercase tracking-[0.18em] text-white/42">
                24/7 field support
              </span>
            </div>

            <div className="relative h-[320px] md:h-[420px]">
              <svg viewBox="0 0 980 480" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full" aria-hidden="true">
                <path d="M73.5 262.5L103 221L163 195L202.5 149.5L312.5 145L388.5 94L514.5 86.5L602.5 124.5L718 119L784.5 151.5L869 187L912 238.5L886.5 281.5L916 332L870 373L744 381L638.5 421L494 421L410.5 394L314 400.5L252.5 370L175 377.5L120 333L73.5 262.5Z" fill="rgba(255,255,255,0.055)" stroke="rgba(255,255,255,0.12)" />
                <path d="M163 195L245.5 237L340.5 220.5L403 242L480.5 221.5L560 242L678.5 230L774.5 257L869 240" stroke="rgba(255,255,255,0.06)" strokeWidth="10" strokeLinecap="round" />

                <g>
                  <circle cx="343" cy="188" r="60" fill="rgba(171,5,45,0.12)" className="geography__map__ellipse--small" />
                  <circle cx="343" cy="188" r="28" fill="rgba(171,5,45,0.22)" />
                  <circle cx="343" cy="188" r="7" fill="#ab052d" />
                  <path d="M343 181V82" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
                  <text x="355" y="78" fill="rgba(255,255,255,0.54)" fontSize="13">{t("locationsRegionYamal")}</text>
                </g>

                <g>
                  <circle cx="565" cy="252" r="70" fill="rgba(171,5,45,0.14)" className="geography__map__ellipse--big" />
                  <circle cx="565" cy="252" r="34" fill="rgba(171,5,45,0.24)" />
                  <circle cx="565" cy="252" r="8" fill="#ab052d" />
                  <path d="M565 244V105" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  <text x="577" y="98" fill="rgba(255,255,255,0.54)" fontSize="13">{t("locationsRegionWest")}</text>
                </g>

                <g>
                  <circle cx="470" cy="278" r="42" fill="rgba(171,5,45,0.12)" />
                  <circle cx="470" cy="278" r="18" fill="rgba(171,5,45,0.18)" />
                  <circle cx="470" cy="278" r="5" fill="#ab052d" />
                  <path d="M470 273V356" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
                  <text x="354" y="380" fill="rgba(255,255,255,0.54)" fontSize="13">{t("locationsRegionKhanty")}</text>
                </g>
              </svg>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.16} direction="left" className="relative overflow-hidden rounded-[34px] border border-white/8 bg-white/5 shadow-[0_30px_70px_rgba(0,0,0,0.2)] min-h-[320px]">
            <Image
              src={introBackground}
              alt={t("locationsProjectTitle")}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 28vw, 100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(57,72,84,0.05)_0%,rgba(57,72,84,0.78)_58%,rgba(57,72,84,0.94)_100%)]" />
            <div className="relative flex h-full flex-col justify-end p-6 md:p-8">
              <span className="mb-4 inline-flex w-fit rounded-full bg-white/12 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/72">
                {t("locationsProjectLabel")}
              </span>
              <h3 className="max-w-[320px] text-[28px] font-normal leading-[1.05] tracking-[-0.04em] text-white">
                {t("locationsProjectTitle")}
              </h3>
              <Link
                href={localePath("/services/service")}
                className="mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-white px-4 py-3 text-[12px] font-medium uppercase tracking-[0.16em] text-dark-900 transition-transform duration-300 hover:translate-x-1"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-white">→</span>
                <span>{t("locationsProjectsCta")}</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}