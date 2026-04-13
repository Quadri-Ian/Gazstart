"use client";

import type { MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import heroBg from "@/assets/intro-background-xxxl-min.jpg";
import manImg from "@/assets/man-1-xxxl.png";

export default function HeroSection() {
  const t = useTranslations("home");
  const locale = useLocale();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 25, mass: 0.6 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25, mass: 0.6 });
  const manX = useTransform(springX, [-0.5, 0.5], [-15, 15]);
  const manY = useTransform(springY, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const normalizedX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const normalizedY = (event.clientY - bounds.top) / bounds.height - 0.5;
    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  const resetMousePosition = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      className="relative flex min-h-[100svh] overflow-hidden bg-dark-900 md:min-h-screen"
      id="top"
      onMouseMove={handleMouseMove}
      onMouseLeave={resetMousePosition}
    >
      {/* Background image */}
      <Image
        src={heroBg}
        alt=""
        fill
        priority
        quality={90}
        className="object-cover object-[62%_center] md:object-center"
        style={{ zIndex: 0 }}
      />

      <div className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(34,44,55,0.58)_0%,rgba(34,44,55,0.4)_44%,rgba(34,44,55,0.56)_100%)] md:bg-dark-900/45" />

      <div className="absolute inset-x-0 bottom-0 z-[2] h-[34vh] md:hidden">
        <div className="absolute bottom-0 left-[-8%] h-[24vh] w-[76%] bg-[#780522] opacity-95 [clip-path:polygon(0_28%,50%_28%,71%_100%,0_100%)]" />
        <div className="absolute bottom-0 right-[-10%] h-[19vh] w-[48%] bg-[#981038] opacity-90 [clip-path:polygon(38%_0,100%_0,100%_100%,0_100%)]" />
      </div>

      <motion.div className="pointer-events-none absolute bottom-0 right-[-14%] z-[3] h-[47vh] select-none md:hidden" style={{ x: manX, y: manY }}>
        <Image
          src={manImg}
          alt=""
          height={900}
          width={520}
          quality={90}
          priority
          className="h-full w-auto object-contain object-bottom"
          draggable={false}
        />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute bottom-0 right-[4%] z-[3] hidden h-[88vh] select-none md:block"
        style={{ x: manX, y: manY }}
      >
        <Image
          src={manImg}
          alt=""
          height={900}
          width={520}
          quality={90}
          priority
          className="h-full w-auto object-contain object-bottom"
          draggable={false}
        />
      </motion.div>

      <div className="relative z-[4] flex min-h-[100svh] w-full flex-col md:min-h-screen">
        <div className="mx-auto flex w-full max-w-[1680px] flex-1 flex-col justify-start px-5 pb-12 pt-[108px] sm:px-[72px] md:justify-center md:pt-[120px] lg:px-[150px] lg:pt-[152px]">
          <h1
            className="max-w-[320px] text-[58px] font-semibold leading-[0.9] tracking-[-0.055em] text-white md:max-w-none md:text-[72px] md:font-light md:leading-[0.95] md:tracking-[-0.04em] lg:text-[112px]"
          >
            {t("heroTitleAccent")}
            <br />
            {t("heroTitleMain")}
          </h1>
          <p
            className="mt-5 max-w-[270px] text-[20px] font-semibold leading-[1.04] tracking-[-0.03em] text-white md:mt-8 md:max-w-[450px] md:text-[20px] md:font-light md:leading-[1.35] md:tracking-[-0.02em]"
          >
            {t("heroSubtitle")}
          </p>
        </div>

        <div className="hidden md:block pb-16">
          <div className="mx-auto w-full max-w-[1680px] px-5 sm:px-[72px] lg:px-[150px]">
            <div className="flex gap-10">
              <Link href={`/${locale}/services/drilling`} className="rising-banner">
                <div className="rising-banner__effect">
                  <div className="rising-banner__effect__image">
                    <div className="absolute inset-0 bg-dark-700" />
                  </div>
                </div>
                <div className="rising-banner__content">
                  <span className="rising-banner__title">{t("heroCtaDrilling")}</span>
                  <span className="rising-banner__count">01</span>
                </div>
                <div className="rising-banner__icon">
                  <span
                    className="flex items-center justify-center rounded-full bg-primary-600 text-white"
                    style={{ width: 28, height: 28 }}
                  >
                    <svg width="5" height="8" viewBox="0 0 5 8" fill="none">
                      <path d="M1 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>

              <Link href={`/${locale}/services/service`} className="rising-banner">
                <div className="rising-banner__effect">
                  <div className="rising-banner__effect__image">
                    <div className="absolute inset-0 bg-dark-600" />
                  </div>
                </div>
                <div className="rising-banner__content">
                  <span className="rising-banner__title">{t("heroCtaServices")}</span>
                  <span className="rising-banner__count">02</span>
                </div>
                <div className="rising-banner__icon">
                  <span
                    className="flex items-center justify-center rounded-full bg-primary-600 text-white"
                    style={{ width: 28, height: 28 }}
                  >
                    <svg width="5" height="8" viewBox="0 0 5 8" fill="none">
                      <path d="M1 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-7 right-5 z-[5] md:bottom-14 md:right-[84px] xl:right-[112px]">
        <a
          href="#geography"
          aria-label="Our Locations"
          className="flex items-center justify-center rounded-full bg-white text-dark-900 transition-transform duration-300 hover:scale-[1.03]"
          style={{ width: 46, height: 46 }}
        >
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
            <path d="M1 1.5L7 6.5L13 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}