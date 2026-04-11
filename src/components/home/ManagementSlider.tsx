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
    <section className="ui-dark-background overflow-hidden pt-0" id="ceo">
      <div className="relative ml-auto w-[calc(100%-max(20px,calc((100vw-1680px)/2+30px)))] sm:w-[calc(100%-max(60px,calc((100vw-1680px)/2+60px)))] lg:w-[calc(100%-max(140px,calc((100vw-1680px)/2+140px)))]">
        <div className="pointer-events-none absolute left-[33%] right-[8%] top-12 z-40 hidden text-white md:block lg:left-[34%] lg:top-14">
          <p className="mb-4 text-[14px] font-normal tracking-[-0.02em] text-white/92 lg:text-[15px]">{t("managementTitle")}</p>
          <div className="h-px bg-white/16" />
        </div>

        <div className="grid grid-cols-1 overflow-hidden lg:grid-cols-[minmax(0,0.49fr)_minmax(0,0.51fr)]">
          <div className="relative min-h-[660px] overflow-hidden bg-[#1e2731] md:min-h-[780px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={person.id}
                initial={{ opacity: 0, x: -28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 28 }}
                transition={{ duration: 0.5, ease: [0.25, 0.74, 0.22, 0.99] }}
                className="absolute inset-0"
              >
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
                <h3 className="absolute bottom-6 right-0 z-40 max-w-[340px] text-right text-[52px] font-normal leading-[0.92] tracking-[-0.06em] text-white md:bottom-10 md:right-0 md:max-w-[410px] md:text-[78px] lg:right-[-4px] lg:max-w-[440px] lg:text-[88px]">
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
                  <p className="text-[15px] leading-[1.34] tracking-[-0.02em] text-white md:text-[17px] lg:text-[18px]">
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
                  <span className="absolute -left-16 top-0 z-20 flex h-16 w-16 items-center justify-center rounded-full bg-white text-primary-600 transition-transform duration-300 group-hover:translate-x-1">
                    <svg width="10" height="16" viewBox="0 0 10 16" fill="none" aria-hidden="true">
                      <path d="M2 2l6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div className="relative h-[126px] w-[126px] overflow-hidden bg-[#1e2731]">
                    <Image
                      src={next.image}
                      alt={`${next.name[0]} ${next.name[1]}`}
                      fill
                      className={`object-cover ${next.imagePosition}`}
                      sizes="126px"
                    />
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
