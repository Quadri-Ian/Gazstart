"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

export default function HeroSection() {
  const t = useTranslations("home");
  const locale = useLocale();

  return (
    <section className="relative flex min-h-screen w-full flex-col overflow-hidden bg-brand-dark">
      {/* Background: dark gradient + placeholder rig silhouette (right side) */}
      <div className="absolute inset-0">
        {/* Deep dark gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2530] via-brand-dark to-[#1f2e3a]" />
        {/* Abstract rig silhouette (right 40%) — pure CSS placeholder */}
        <div className="absolute right-0 top-0 h-full w-1/2 overflow-hidden">
          {/* Gradient that simulates a dark industrial silhouette */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-brand-dark/60" />
          {/* Vertical structural lines simulating a derrick */}
          <svg
            className="absolute right-0 top-0 h-full w-full text-white/5"
            viewBox="0 0 600 900"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Main derrick tower */}
            <polygon points="300,40 340,800 260,800" fill="currentColor" opacity="0.6" />
            {/* Cross braces */}
            <line x1="270" y1="200" x2="330" y2="200" stroke="currentColor" strokeWidth="6" opacity="0.4" />
            <line x1="265" y1="350" x2="335" y2="350" stroke="currentColor" strokeWidth="6" opacity="0.4" />
            <line x1="260" y1="500" x2="340" y2="500" stroke="currentColor" strokeWidth="6" opacity="0.4" />
            <line x1="255" y1="650" x2="345" y2="650" stroke="currentColor" strokeWidth="6" opacity="0.4" />
            {/* Platform base */}
            <rect x="200" y="790" width="200" height="30" fill="currentColor" opacity="0.5" />
            <rect x="150" y="820" width="300" height="20" fill="currentColor" opacity="0.4" />
            {/* Worker silhouette */}
            <ellipse cx="380" cy="825" rx="15" ry="40" fill="currentColor" opacity="0.5" />
            <circle cx="380" cy="778" r="14" fill="currentColor" opacity="0.5" />
            {/* Pipe rack */}
            <rect x="420" y="760" width="120" height="8" fill="currentColor" opacity="0.3" />
            <rect x="420" y="775" width="120" height="8" fill="currentColor" opacity="0.3" />
            <rect x="420" y="790" width="120" height="8" fill="currentColor" opacity="0.3" />
          </svg>
        </div>
      </div>

      {/* Red geometric accent block */}
      <div className="absolute right-[28%] top-[15%] h-40 w-1 bg-brand-red opacity-80 md:h-64" />
      <div className="absolute right-[20%] top-[12%] h-2 w-24 bg-brand-red opacity-60 md:w-40" />

      {/* Main content */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-6 pb-48 pt-32 md:px-12 lg:px-20 xl:max-w-7xl xl:mx-auto xl:w-full">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 text-xs uppercase tracking-[0.25em] text-white/50"
        >
          GazStart — Oil &amp; Gas Services
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1 }}
          className="max-w-2xl text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl"
        >
          {t("heroTitle")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-6 max-w-md text-base text-white/60 md:text-lg"
        >
          {t("heroSubtitle")}
        </motion.p>
      </div>

      {/* Bottom-left cards */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="absolute bottom-0 left-0 z-20 flex"
      >
        {/* Drilling card */}
        <Link
          href={`/${locale}/services/drilling`}
          className="group flex flex-col justify-between border-r border-white/10 bg-brand-nav/90 p-5 backdrop-blur-sm transition-colors hover:bg-brand-red md:w-48 lg:w-56"
        >
          <div className="mb-8 flex items-start justify-between">
            <span className="text-xs uppercase tracking-widest text-white/50">
              {t("heroCard1Label")}
            </span>
            <span className="text-2xl font-bold text-white/20">{t("heroCard1Num")}</span>
          </div>
          {/* Thumbnail strip (placeholder) */}
          <div className="mb-4 h-1 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-3/5 rounded-full bg-brand-red transition-all group-hover:bg-white" />
          </div>
          {/* Circular arrow button */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-white">{t("heroCard1Label")}</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 transition-colors group-hover:border-white">
              <svg className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </Link>

        {/* Services card */}
        <Link
          href={`/${locale}/services/service`}
          className="group flex flex-col justify-between bg-brand-nav/70 p-5 backdrop-blur-sm transition-colors hover:bg-brand-red md:w-48 lg:w-56"
        >
          <div className="mb-8 flex items-start justify-between">
            <span className="text-xs uppercase tracking-widest text-white/50">
              {t("heroCard2Label")}
            </span>
            <span className="text-2xl font-bold text-white/20">{t("heroCard2Num")}</span>
          </div>
          <div className="mb-4 h-1 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-2/5 rounded-full bg-white/30 transition-all group-hover:bg-white" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-white">{t("heroCard2Label")}</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 transition-colors group-hover:border-white">
              <svg className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </Link>
      </motion.div>

      {/* Down-arrow button bottom-right */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
        className="absolute bottom-8 right-8 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm transition-colors hover:bg-brand-red hover:border-brand-red"
        aria-label="Scroll down"
      >
        <motion.svg
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="h-5 w-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>
    </section>
  );
}
