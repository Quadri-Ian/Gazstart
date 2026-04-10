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
    <section className="ui-dark-background overflow-hidden" id="ceo">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        <div className="relative min-h-[560px] overflow-hidden bg-[#435361] md:min-h-[720px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={person.id}
              initial={{ opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 32 }}
              transition={{ duration: 0.55, ease: [0.25, 0.74, 0.22, 0.99] }}
              className="absolute inset-0"
            >
              <Image
                src={person.image}
                alt={`${person.name[0]} ${person.name[1]}`}
                fill
                className={`object-cover ${person.imagePosition}`}
                sizes="(min-width: 1024px) 46vw, 100vw"
                priority={active === 0}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(57,72,84,0.08)_0%,rgba(57,72,84,0.34)_38%,rgba(57,72,84,0.92)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
                <p className="mb-3 max-w-[180px] text-[12px] uppercase tracking-[0.22em] text-white/48">
                  {person.role}
                </p>
                <h3 className="max-w-[360px] text-[48px] font-normal leading-[0.92] tracking-[-0.06em] text-white md:text-[88px]">
                  {person.name[0]}
                  <br />
                  {person.name[1]}
                </h3>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative flex min-h-[560px] flex-col bg-primary-600 px-6 py-10 text-white md:px-10 md:py-12 lg:min-h-[720px] lg:px-14 lg:py-14">
          <div className="title-border mb-10 border-white/18">
            <h2>{t("managementTitle")}</h2>
          </div>

          <div className="flex flex-1 flex-col justify-between gap-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={person.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.45, ease: [0.25, 0.74, 0.22, 0.99] }}
                className="max-w-[620px]"
              >
                <svg width="46" height="40" viewBox="0 0 46 40" fill="none" aria-hidden="true" className="mb-8 text-white/55">
                  <path d="M0 40V24C0 9.778 6.222 1.778 18.667 0L21.333 4C15.111 5.778 12.444 9.333 12 14.667h6.667V40H0zm25.333 0V24C25.333 9.778 31.556 1.778 44 0l2 4c-6.222 1.778-8.889 5.333-9.333 10.667h6.667V40H25.333z" fill="currentColor" />
                </svg>
                <p className="max-w-[560px] text-[19px] leading-[1.65] tracking-[-0.02em] text-white/92 md:text-[22px]">
                  {person.quote}
                </p>
                <Link
                  href={`/${locale}${person.href}`}
                  className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/20 px-5 py-3 text-[12px] uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-white hover:text-primary-600"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-primary-600">→</span>
                  <span>{common("learnMore")}</span>
                </Link>
              </motion.div>
            </AnimatePresence>

            <div className="border-t border-white/14 pt-8">
              <div className="mb-7 overflow-hidden rounded-full bg-white/18">
                <motion.div
                  key={person.id}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: "linear" }}
                  className="h-[3px] origin-left bg-white"
                />
              </div>

              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
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
                  className="group flex items-center gap-4 self-start rounded-full border border-white/16 bg-white/6 px-3 py-3 pr-5 text-left transition-colors duration-300 hover:bg-white/12"
                  aria-label={t("managementNextLabel")}
                >
                  <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/18">
                    <Image
                      src={next.image}
                      alt={`${next.name[0]} ${next.name[1]}`}
                      fill
                      className={`object-cover ${next.imagePosition}`}
                      sizes="56px"
                    />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-white/50">{t("managementNextLabel")}</p>
                    <p className="mt-1 text-[17px] leading-tight tracking-[-0.03em] text-white">
                      {next.name[0]} {next.name[1]}
                    </p>
                  </div>
                  <span className="ml-2 flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary-600 transition-transform duration-300 group-hover:translate-x-1">
                    <svg width="8" height="12" viewBox="0 0 8 12" fill="none" aria-hidden="true">
                      <path d="M1 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
