"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

const slides = [
  {
    bg: "from-primary-900/40 to-dark-900",
    label: "01",
    key: "drilling",
  },
  {
    bg: "from-accent-600/20 to-dark-900",
    label: "02",
    key: "service",
  },
];

export default function HeroSection() {
  const t = useTranslations("home");
  const locale = useLocale();
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-dark-900 pt-20">
      {/* Animated background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 bg-gradient-to-br ${slides[activeSlide].bg}`}
        />
      </AnimatePresence>

      {/* Grid decoration */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-xs uppercase tracking-widest text-primary-500"
          >
            GazStart — Oil & Gas Services
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl"
          >
            {t("heroTitle")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg text-white/70"
          >
            {t("heroSubtitle")}
          </motion.p>

          {/* Slide tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex gap-4"
          >
            {slides.map((slide, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`group flex items-center gap-3 border px-6 py-3 text-sm font-medium transition-all duration-300 ${
                  activeSlide === i
                    ? "border-primary-500 bg-primary-500 text-white"
                    : "border-white/20 text-white/60 hover:border-white/40 hover:text-white"
                }`}
              >
                <span>{i === 0 ? t("heroCtaDrilling") : t("heroCtaServices")}</span>
                <span className="opacity-50">{slide.label}</span>
              </button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-6"
          >
            <Link
              href={`/${locale}/${activeSlide === 0 ? "services/drilling" : "services/service"}`}
              className="inline-flex items-center gap-2 text-sm text-primary-400 transition-colors hover:text-primary-300"
            >
              Learn more
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-1 text-xs text-white/30"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
