"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";

const AUTO_ADVANCE_MS = 7000;

export default function ManagementSlider() {
  const locale = useLocale();
  const t = useTranslations("home");
  const common = useTranslations("common");
  const [active, setActive] = useState(0);

  const people = [
    {
      id: 0,
      name: ["Tural", "Kerimov"],
      role: t("managementRoleChairman"),
      quote: t("managementQuoteChairman"),
      href: "/company/about",
      image:
        "https://naftagaz.com/upload/resize_cache/iblock/002/600_720_2/ml6wnjv460x3pr8vrrs6vosoiwpmk19k.jpg",
      imagePosition: "object-center",
    },
    {
      id: 1,
      name: ["Nikolay", "Grishankov"],
      role: t("managementRoleCeo"),
      quote: t("managementQuoteCeo"),
      href: "/company/about",
      image:
        "https://naftagaz.com/upload/resize_cache/iblock/0fc/540_675_2/z08x2y4fjg2wq0iwgj2d5477r01v38pe.png",
      imagePosition: "object-top",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setActive((prev) => (prev + 1) % people.length);
    }, AUTO_ADVANCE_MS);

    return () => clearTimeout(timer);
  }, [active, people.length]);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % people.length);
  };

  const person = people[active];
  const next = people[(active + 1) % people.length];

  return (
    <section className="overflow-hidden bg-[linear-gradient(180deg,#394858_0%,#394858_50%,#ffffff_50%,#ffffff_100%)] pt-0" id="ceo">
      <div className="md:hidden">
        <div className="border-b border-white/12 px-5 pb-4 pt-5 text-white">
          <div className="flex items-center justify-between text-[13px] leading-none tracking-[-0.02em]">
            <span>{t("managementTitle")}</span>
            <span className="text-white/72">{active + 1}/{people.length}</span>
          </div>
        </div>

        <div className="relative">
          <div className="relative min-h-[388px] overflow-hidden bg-[#1e2731]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`mobile-${person.id}`}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 24 }}
                transition={{ duration: 0.5, ease: [0.25, 0.74, 0.22, 0.99] }}
                className="absolute inset-0"
              >
                <Image
                  src={person.image}
                  alt={`${person.name[0]} ${person.name[1]}`}
                  fill
                  className={`object-cover ${person.imagePosition}`}
                  sizes="100vw"
                  priority={active === 0}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(19,27,35,0.06)_0%,rgba(19,27,35,0.08)_34%,rgba(19,27,35,0.34)_100%)]" />
                <p className="absolute bottom-[118px] left-5 max-w-[64px] text-[11px] leading-[0.96] tracking-[-0.03em] text-white/82">
                  {person.role}
                </p>
                <h3 className="absolute bottom-[-8px] left-5 z-30 text-[56px] font-normal leading-[0.9] tracking-[-0.07em] text-white">
                  {person.name[0]}
                  <br />
                  {person.name[1]}
                </h3>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={handleNext}
              className="absolute bottom-[70px] right-5 z-30 flex items-start"
              aria-label={t("managementNextLabel")}
            >
              <span className="absolute -left-5 top-1 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary-600">
                <svg width="8" height="12" viewBox="0 0 10 16" fill="none" aria-hidden="true">
                  <path d="M2 2l6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div className="relative h-[92px] w-[74px] overflow-hidden bg-[#1e2731] shadow-[0_18px_44px_rgba(0,0,0,0.22)]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`mobile-next-${next.id}`}
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0.2 }}
                    transition={{ duration: 0.28, ease: "linear" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={next.image}
                      alt={`${next.name[0]} ${next.name[1]}`}
                      fill
                      className={`object-cover ${next.imagePosition}`}
                      sizes="74px"
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/20">
                  <motion.div
                    key={`mobile-progress-${active}-${next.id}`}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: "linear" }}
                    className="h-full bg-white"
                  />
                </div>
              </div>
            </button>
          </div>

          <div className="relative z-20 -mt-4 rounded-t-[22px] bg-primary-600 px-5 pb-8 pt-24 text-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={`mobile-quote-${person.id}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.42, ease: [0.25, 0.74, 0.22, 0.99] }}
              >
                <svg width="30" height="24" viewBox="0 0 46 40" fill="none" aria-hidden="true" className="mb-5 text-white">
                  <path d="M0 40V24C0 9.778 6.222 1.778 18.667 0L21.333 4C15.111 5.778 12.444 9.333 12 14.667h6.667V40H0zm25.333 0V24C25.333 9.778 31.556 1.778 44 0l2 4c-6.222 1.778-8.889 5.333-9.333 10.667h6.667V40H25.333z" fill="currentColor" />
                </svg>
                <p className="text-[15px] leading-[1.22] tracking-[-0.03em] text-white">{person.quote}</p>
                <Link
                  href={`/${locale}${person.href}`}
                  className="mt-7 inline-flex items-center gap-3 text-[12px] text-white transition-opacity duration-300 hover:opacity-80"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[14px] text-primary-600">›</span>
                  <span>{common("learnMore")}</span>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="relative hidden md:ml-auto md:block md:w-[calc(100%-max(60px,calc((100vw-1680px)/2+60px)))] lg:w-[calc(100%-max(140px,calc((100vw-1680px)/2+140px)))]">
        <div className="pointer-events-none absolute left-[33%] right-[8%] top-12 z-40 hidden text-white md:block lg:left-[34%] lg:top-14">
          <p className="mb-4 text-[14px] font-normal tracking-[-0.02em] text-white/92 lg:text-[15px]">{t("managementTitle")}</p>
          <div className="h-px bg-white/16" />
        </div>

        <div className="grid grid-cols-1 overflow-visible lg:grid-cols-[minmax(0,0.49fr)_minmax(0,0.51fr)]">
          <div className="relative min-h-[660px] overflow-visible bg-[#1e2731] md:min-h-[780px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={person.id}
                initial={{ opacity: 0, x: -28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 28 }}
                transition={{ duration: 0.5, ease: [0.25, 0.74, 0.22, 0.99] }}
                className="absolute inset-0 overflow-visible"
              >
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src={person.image}
                    alt={`${person.name[0]} ${person.name[1]}`}
                    fill
                    className={`object-cover ${person.imagePosition}`}
                    sizes="(min-width: 1024px) 38vw, 100vw"
                    priority={active === 0}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(19,27,35,0.02)_0%,rgba(19,27,35,0.04)_34%,rgba(19,27,35,0.24)_100%)]" />
                  <p className="absolute bottom-16 left-10 text-[11px] uppercase tracking-[0.16em] text-white/52 md:bottom-20 md:left-14 md:text-[12px]">
                    {person.role}
                  </p>
                </div>
                <h3 className="absolute bottom-6 left-full z-[70] max-w-[360px] -translate-x-[45%] text-left text-[52px] font-normal leading-[0.92] tracking-[-0.06em] text-white md:bottom-10 md:max-w-[420px] md:text-[74px] lg:max-w-[470px] lg:text-[86px]">
                  {person.name[0]}
                  <br />
                  {person.name[1]}
                </h3>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative min-h-[660px] bg-primary-600 px-8 py-12 text-white md:min-h-[780px] md:px-14 md:py-16 lg:pr-[84px]">
            <div className="flex h-full flex-col justify-between pt-24 md:pt-28 lg:pt-32">
              <AnimatePresence mode="wait">
                <motion.div
                  key={person.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.42, ease: [0.25, 0.74, 0.22, 0.99] }}
                  className="max-w-[360px] lg:ml-auto lg:mr-[8%] lg:mt-[8%]"
                >
                  <svg width="30" height="24" viewBox="0 0 46 40" fill="none" aria-hidden="true" className="mb-5 text-white">
                    <path d="M0 40V24C0 9.778 6.222 1.778 18.667 0L21.333 4C15.111 5.778 12.444 9.333 12 14.667h6.667V40H0zm25.333 0V24C25.333 9.778 31.556 1.778 44 0l2 4c-6.222 1.778-8.889 5.333-9.333 10.667h6.667V40H25.333z" fill="currentColor" />
                  </svg>
                  <p className="text-[14px] leading-[1.34] tracking-[-0.02em] text-white md:text-[16px] lg:text-[17px]">
                    {person.quote}
                  </p>
                  <Link
                    href={`/${locale}${person.href}`}
                    className="mt-7 inline-flex items-center gap-4 text-[13px] text-white transition-opacity duration-300 hover:opacity-80 md:text-[14px]"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-primary-600">›</span>
                    <span>{common("learnMore")}</span>
                  </Link>
                </motion.div>
              </AnimatePresence>

              <div className="mt-10 flex items-end justify-end pb-8 md:pb-10">
                <button
                  onClick={handleNext}
                  className="group relative flex items-start"
                  aria-label={t("managementNextLabel")}
                >
                  <span className="absolute -left-8 -top-8 z-30 flex h-16 w-16 items-center justify-center rounded-full bg-white text-primary-600 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <svg width="10" height="16" viewBox="0 0 10 16" fill="none" aria-hidden="true">
                      <path d="M2 2l6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div className="relative h-[162px] w-[128px] overflow-hidden bg-[#1e2731] md:h-[176px] md:w-[138px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={next.id}
                        initial={{ opacity: 0.2 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0.2 }}
                        transition={{ duration: 0.28, ease: "linear" }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={next.image}
                          alt={`${next.name[0]} ${next.name[1]}`}
                          fill
                          className={`object-cover ${next.imagePosition}`}
                          sizes="138px"
                        />
                      </motion.div>
                    </AnimatePresence>
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/20">
                      <motion.div
                        key={`${active}-${next.id}`}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: "linear" }}
                        className="h-full bg-white"
                      />
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
