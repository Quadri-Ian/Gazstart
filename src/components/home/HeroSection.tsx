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
      className="relative flex min-h-screen overflow-hidden bg-dark-900"
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
        className="object-cover object-center"
        style={{ zIndex: 0 }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 z-[1] bg-dark-900/45" />

      {/* NZ geometric logo mark overlay (right side) */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute bottom-0 right-0 top-0 flex items-center" style={{ right: "5%" }}>
          <svg
            viewBox="0 0 2022 711"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-[90vh] w-auto opacity-[0.06]"
          >
            <clipPath id="nz-clip">
              <rect x="0" y="0" width="2022" height="711" />
            </clipPath>
            <g clipPath="url(#nz-clip)">
              <path
                opacity="1"
                stroke="white"
                strokeWidth="1"
                d="M3185.5 1V0.5H3185L474.005 0.500031H473.505V1.00003V353.844L238.944 0.723377L238.795 0.500031H238.527H1H0.5V1.00003V710V710.5H1H238.527H239.027V710V357.147L475.284 710.278L475.432 710.5H475.699H3185H3185.5V710V1Z"
              />
            </g>
          </svg>
        </div>
      </div>

      {/* Man figure */}
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

      {/* Content */}
      <div className="relative z-[4] flex min-h-screen w-full flex-col">
        {/* Main text content */}
        <div className="container-h flex flex-1 flex-col justify-center pb-12 pt-[120px] lg:pt-[152px]">
          <h1
            className="text-white font-light leading-[0.95] tracking-[-0.04em]"
            style={{ fontSize: "clamp(48px, 8vw, 130px)" }}
          >
            {t("heroTitleAccent")}
            <br />
            {t("heroTitleMain")}
          </h1>
          <p
            className="mt-6 text-white/60 font-light"
            style={{ fontSize: "clamp(16px, 1.6vw, 20px)", letterSpacing: "-0.02em", maxWidth: 400 }}
          >
            {t("heroSubtitle")}
          </p>
        </div>

        {/* Rising banner cards — desktop only */}
        <div className="hidden md:block pb-16">
          <div className="container-h">
            <div className="flex gap-10">
              {/* Drilling card */}
              <Link href={`/${locale}/services/drilling`} className="rising-banner">
                <div className="rising-banner__effect">
                  <div className="rising-banner__effect__image">
                    {/* Placeholder dark bg used when no image */}
                    <div className="absolute inset-0 bg-dark-700" />
                  </div>
                </div>
                <div className="rising-banner__content">
                  <span className="rising-banner__title">{t("heroCtaDrilling")}</span>
                  <span className="rising-banner__count">01</span>
                </div>
                {/* Arrow icon */}
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

              {/* Services card */}
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

      {/* Scroll down button */}
      <div className="absolute bottom-8 right-6 z-[5] md:bottom-10 md:right-10">
        <a
          href="#geography"
          aria-label="Our Locations"
          className="flex items-center justify-center rounded-full bg-white text-dark-900 transition-transform duration-300 hover:scale-[1.03]"
          style={{ width: 44, height: 44 }}
        >
          <svg width="12" height="6" viewBox="0 0 12 6" fill="none">
            <path d="M1 1l5 4 5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}