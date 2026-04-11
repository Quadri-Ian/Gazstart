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

  const handleSelect = (index: number) => {
    setActive(index);
  };

  const handleNext = () => {
    setActive((prev) => (prev + 1) % people.length);
  };

  const person = people[active];
  const next = people[(active + 1) % people.length];

  return (
    <section className="ui-dark-background overflow-hidden py-12 md:py-20" id="ceo">
      <div className="container-h">
        <div className="grid grid-cols-1 overflow-hidden lg:grid-cols-[minmax(0,0.52fr)_minmax(0,0.48fr)]">
          <div className="relative min-h-[620px] overflow-hidden bg-[#1e2731] md:min-h-[760px]">
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
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(19,27,35,0.02)_0%,rgba(19,27,35,0.08)_35%,rgba(19,27,35,0.42)_100%)]" />
                <p className="absolute bottom-16 left-10 text-[13px] uppercase tracking-[0.18em] text-white/52 md:left-14 md:bottom-20">
                  {person.role}
                </p>
                <h3 className="absolute bottom-6 left-[58%] max-w-[420px] -translate-x-1/2 text-[64px] font-normal leading-[0.92] tracking-[-0.06em] text-white md:bottom-10 md:text-[88px]">
                  {person.name[0]}
                  <br />
                  {person.name[1]}
                </h3>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative min-h-[620px] bg-primary-600 px-8 py-12 text-white md:min-h-[760px] md:px-14 md:py-16">
            <div className="title-border border-white/16">
              <h2>{t("managementTitle")}</h2>
            </div>

            <div className="flex h-full flex-col justify-between pt-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={person.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.42, ease: [0.25, 0.74, 0.22, 0.99] }}
                  className="max-w-[430px] lg:ml-auto lg:mr-[8%]"
                >
                  <svg width="40" height="34" viewBox="0 0 46 40" fill="none" aria-hidden="true" className="mb-8 text-white">
                    <path d="M0 40V24C0 9.778 6.222 1.778 18.667 0L21.333 4C15.111 5.778 12.444 9.333 12 14.667h6.667V40H0zm25.333 0V24C25.333 9.778 31.556 1.778 44 0l2 4c-6.222 1.778-8.889 5.333-9.333 10.667h6.667V40H25.333z" fill="currentColor" />
                  </svg>
                  <p className="text-[20px] leading-[1.34] tracking-[-0.02em] text-white md:text-[24px]">
                    {person.quote}
                  </p>
                  <Link
                    href={`/${locale}${person.href}`}
                    className="mt-10 inline-flex items-center gap-4 text-[15px] text-white transition-opacity duration-300 hover:opacity-80"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-primary-600">›</span>
                    <span>{common("learnMore")}</span>
                  </Link>
                </motion.div>
              </AnimatePresence>

              <div className="mt-12 flex items-end justify-between gap-6">
                <div className="flex gap-3">
                  {people.map((p, index) => (
                    <button
                      key={p.id}
                      onClick={() => handleSelect(index)}
                      aria-label={`${p.name[0]} ${p.name[1]}`}
                      className={`h-[10px] w-[10px] rounded-full border transition-colors duration-200 ${
                        index === active
                          ? "border-white bg-white"
                          : "border-white/30 bg-transparent hover:border-white/60"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="group relative flex items-start"
                  aria-label={t("managementNextLabel")}
                >
                  <span className="absolute -left-14 top-0 flex h-14 w-14 items-center justify-center rounded-full bg-white text-primary-600 transition-transform duration-300 group-hover:translate-x-1">
                    <svg width="10" height="16" viewBox="0 0 10 16" fill="none" aria-hidden="true">
                      <path d="M2 2l6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div className="relative h-[118px] w-[118px] overflow-hidden bg-[#1e2731]">
                    <Image
                      src={next.image}
                      alt={`${next.name[0]} ${next.name[1]}`}
                      fill
                      className={`object-cover ${next.imagePosition}`}
                      sizes="118px"
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
