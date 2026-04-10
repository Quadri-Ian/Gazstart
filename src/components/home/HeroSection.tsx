"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import heroBg from "@/assets/intro-background-xxxl-min.jpg";
import manImg from "@/assets/man-1-xxxl.png";

export default function HeroSection() {
  const t = useTranslations("home");
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse parallax for man image
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 40, damping: 25 });
  const springY = useSpring(rawY, { stiffness: 40, damping: 25 });
  const manX = useTransform(springX, [-0.5, 0.5], [-18, 18]);
  const manY = useTransform(springY, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      rawX.set((e.clientX - rect.left) / rect.width - 0.5);
      rawY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [rawX, rawY]
  );

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex min-h-screen overflow-hidden bg-dark-900"
    >
      {/* ── Background photo ── */}
      <Image
        src={heroBg}
        alt=""
        fill
        priority
        quality={90}
        className="object-cover object-center"
        style={{ zIndex: 0 }}
      />

      {/* ── Dark overlay ── */}
      <div className="absolute inset-0 z-[1] bg-dark-900/55" />

      {/* ── Red geometric brand mark ── */}
      <div className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-end pr-[8%]">
        <svg
          viewBox="0 0 520 640"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-[72vh] w-auto opacity-90"
          aria-hidden="true"
        >
          {/* Left chevron panel */}
          <polygon points="0,0 220,0 340,640 120,640" fill="#dc2626" />
          {/* Right chevron panel — offset to the right, cut-out feel */}
          <polygon points="260,0 370,0 490,640 380,640" fill="#dc2626" />
          {/* Inner white cut-out triangle — creates the negative space "N/arrow" shape */}
          <polygon points="220,0 260,0 380,640 340,640" fill="#0e1a27" />
        </svg>
      </div>

      {/* ── Man image with parallax ── */}
      <motion.div
        style={{ x: manX, y: manY }}
        className="pointer-events-none absolute bottom-0 right-[4%] z-[3] h-[88vh] select-none"
      >
        <Image
          src={manImg}
          alt="Field engineer"
          height={900}
          width={520}
          quality={90}
          priority
          className="h-full w-auto object-contain object-bottom"
          draggable={false}
        />
      </motion.div>

      {/* ── Left content ── */}
      <div className="relative z-[4] flex min-h-screen w-full flex-col justify-center px-8 pt-32 md:px-16 lg:px-24">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/50"
          >
            GazStart — Oil &amp; Gas Services
          </motion.p>

          {/* Main heading — two lines */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-6xl font-black leading-[1.05] tracking-tight text-white md:text-7xl lg:text-8xl"
          >
            {t("heroTitleAccent")}
            <br />
            {t("heroTitleMain")}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 max-w-sm text-base font-medium leading-relaxed text-white/70 md:text-lg"
          >
            {t("heroSubtitle")}
          </motion.p>
        </div>

        {/* ── Service cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-14 flex gap-4"
        >
          {[
            {
              title: t("heroCtaDrilling"),
              number: "01",
              href: `/${locale}/services/drilling`,
            },
            {
              title: t("heroCtaServices"),
              number: "02",
              href: `/${locale}/services/service`,
            },
          ].map((card) => (
            <Link
              key={card.number}
              href={card.href}
              className="group relative flex h-36 w-52 flex-col justify-between overflow-hidden bg-white/95 p-4 transition-all duration-300 hover:bg-white hover:shadow-2xl"
            >
              {/* Card top content */}
              <div>
                <p className="text-base font-semibold text-gray-900">{card.title}</p>
                <p className="mt-0.5 text-xs text-gray-400">{card.number}</p>
              </div>

              {/* Arrow button */}
              <div className="flex items-end justify-end">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-dark-800 transition-colors group-hover:bg-primary-600">
                  <svg className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              {/* Bottom thumbnail strip */}
              <div className="absolute inset-x-0 bottom-0 h-10 overflow-hidden">
                <div className="relative h-full w-full">
                  <Image
                    src={heroBg}
                    alt=""
                    fill
                    className="object-cover object-center opacity-40 transition-opacity duration-300 group-hover:opacity-60"
                  />
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>

      {/* ── Scroll indicator — bottom right ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 right-8 z-[5]"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white/50"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
