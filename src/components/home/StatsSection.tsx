"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";

import longtool from "@/assets/longtool.png";

export default function StatsSection() {
  const t = useTranslations("home");
  const mouseX = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 22, mass: 0.48 });
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);
  const shiftX = useTransform(smoothX, [-0.5, 0.5], [-34, 34]);

  const handleMove = (event: React.MouseEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const progress = (event.clientX - bounds.left) / bounds.width;
    mouseX.set(progress - 0.5);
  };

  const handleLeave = () => {
    mouseX.set(0);
  };

  return (
    <section className="bg-white pb-20 pt-24 md:pb-28 md:pt-28 lg:pt-32" id="performance">
      <div
        className="container-h relative overflow-hidden rounded-t-[28px] bg-white px-5 pt-8 sm:px-[60px] md:min-h-[860px] md:pt-10 lg:min-h-[960px] lg:px-[150px] lg:pt-12"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <div className="title-border title-border--grey relative z-20 mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-[18px] font-normal tracking-[-0.02em] text-primary-600 md:text-[20px]">{t("statsDrilled")}</h2>
        </div>

        <motion.div
          style={{ rotateY, x: shiftX, transformPerspective: 2000 }}
          className="pointer-events-none absolute inset-x-0 top-[18px] z-10 flex justify-center md:top-[-18px] lg:top-[-34px]"
        >
          <Image
            src={longtool}
            alt={t("statsRigAlt")}
            className="h-auto w-[560px] select-none opacity-[0.28] md:w-[780px] lg:w-[980px]"
            priority={false}
          />
        </motion.div>

        <div className="relative z-20 flex min-h-[620px] flex-col justify-between md:min-h-[740px] lg:min-h-[820px]">
          <div className="pt-6 md:pt-8 lg:pt-10">
            <p className="whitespace-nowrap text-[92px] font-[350] leading-[0.88] tracking-[-0.075em] text-primary-600 md:text-[154px] lg:text-[220px]">
              {t("statsDrilledValue")}
              <span className="align-top text-[0.32em] leading-none">+</span>
            </p>
          </div>

          <div className="grid gap-12 pb-8 md:grid-cols-[minmax(240px,1fr)_minmax(160px,1fr)_minmax(240px,1fr)] md:gap-10 md:pb-12 lg:pb-16">
            <div>
              <p className="border-t border-[#dfe5eb] pb-6 pt-5 text-[16px] font-normal tracking-[-0.02em] text-[#445567] md:text-[18px]">
                {t("statsAnnualDrillingLabel")}
              </p>
              <p className="whitespace-nowrap text-[52px] font-normal leading-[0.95] tracking-[-0.06em] text-[#394858] md:text-[72px] lg:text-[78px]">
                {t("statsAnnualDrillingValue")}
              </p>
            </div>

            <div className="hidden md:block" />

            <div>
              <p className="border-t border-[#dfe5eb] pb-6 pt-5 text-[16px] font-normal tracking-[-0.02em] text-[#445567] md:text-[18px]">
                {t("statsTotalInvestmentsLabel")}
              </p>
              <p className="whitespace-nowrap text-[52px] font-normal leading-[0.95] tracking-[-0.06em] text-[#394858] md:text-[72px] lg:text-[78px]">
                {t("statsTotalInvestmentsValue")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
