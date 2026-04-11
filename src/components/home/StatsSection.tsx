"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";

import longtool from "@/assets/longtool.png";

export default function StatsSection() {
  const t = useTranslations("home");
  const mouseX = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 110, damping: 18, mass: 0.55 });
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-7, 7]);
  const [isInside, setIsInside] = useState(false);

  const handleMove = (event: React.MouseEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const progress = (event.clientX - bounds.left) / bounds.width;
    mouseX.set(progress - 0.5);
  };

  const handleLeave = () => {
    setIsInside(false);
    mouseX.set(0);
  };

  return (
    <section className="bg-white pb-20 pt-0 md:pb-28" id="performance">
      <div className="container-h overflow-hidden rounded-t-[28px] bg-white px-5 pt-6 sm:px-[60px] md:pt-8 lg:px-[150px] lg:pt-10">
        <div className="border-b border-[#dfe5eb] pb-6 md:pb-7">
          <h2 className="text-[18px] font-normal tracking-[-0.02em] text-primary-600 md:text-[20px]">{t("statsDrilled")}</h2>
        </div>

        <div
          className="relative min-h-[680px] md:min-h-[760px] lg:min-h-[820px]"
          onMouseMove={handleMove}
          onMouseEnter={() => setIsInside(true)}
          onMouseLeave={handleLeave}
        >
          <motion.div
            style={{ rotateY, transformPerspective: 1800 }}
            className="pointer-events-none absolute left-1/2 top-0 z-10 w-[260px] -translate-x-[8%] md:w-[360px] lg:w-[520px]"
          >
            <Image
              src={longtool}
              alt={t("statsRigAlt")}
              className="h-auto w-full select-none"
              priority={false}
            />
          </motion.div>

          <div className="relative z-20 pt-8 md:pt-10 lg:pt-12">
            <p className="text-[82px] font-[350] leading-[0.9] tracking-[-0.07em] text-primary-600 md:text-[132px] lg:text-[174px]">
              {t("statsDrilledValue")}
              <span className="align-top text-[0.34em] leading-none">+</span>
            </p>
          </div>

          <div className="absolute bottom-8 left-0 right-0 z-20 grid gap-12 md:bottom-10 md:grid-cols-[minmax(260px,384px)_1fr_minmax(260px,380px)] lg:bottom-14 lg:gap-8">
            <div>
              <p className="border-t border-[#dfe5eb] pb-6 pt-5 text-[16px] font-normal tracking-[-0.02em] text-[#445567] md:text-[18px]">
                {t("statsAnnualDrillingLabel")}
              </p>
              <p className="text-[52px] font-normal leading-[0.95] tracking-[-0.06em] text-[#394858] md:text-[72px] lg:text-[78px]">
                {t("statsAnnualDrillingValue")}
              </p>
            </div>

            <div className="hidden md:block" />

            <div>
              <p className="border-t border-[#dfe5eb] pb-6 pt-5 text-[16px] font-normal tracking-[-0.02em] text-[#445567] md:text-[18px]">
                {t("statsTotalInvestmentsLabel")}
              </p>
              <p className="text-[52px] font-normal leading-[0.95] tracking-[-0.06em] text-[#394858] md:text-[72px] lg:text-[78px]">
                {t("statsTotalInvestmentsValue")}
              </p>
            </div>
          </div>

          <motion.div
            animate={{ opacity: isInside ? 1 : 0.7 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="pointer-events-none absolute inset-0"
          />
        </div>
      </div>
    </section>
  );
}
