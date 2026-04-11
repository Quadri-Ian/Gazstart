"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import introBackground from "@/assets/intro-background-xxxl-min.jpg";
import workerImage from "@/assets/man-1-xxxl.png";
import type { SustainabilitySlide } from "@/components/company/sustainabilitySlides";

interface SustainabilityShowcaseProps {
  slides: SustainabilitySlide[];
}

const visualByIndex: Array<{
  bgPosition: string;
  workerClassName: string;
  titleClassName: string;
  titleWrapClassName: string;
  descriptionClassName: string;
}> = [
  {
    bgPosition: "72% center",
    workerClassName:
      "right-[-2%] bottom-0 w-[57%] max-w-none md:right-[-3%] md:w-[62%] lg:right-[-2%] lg:w-[60%]",
    titleClassName:
      "max-w-[540px] text-[60px] leading-[0.9] md:text-[88px] lg:text-[76px] xl:text-[84px]",
    titleWrapClassName: "left-[35%] top-[15%] w-[42%]",
    descriptionClassName: "mt-[88px] md:mt-[108px] lg:mt-[138px]",
  },
  {
    bgPosition: "74% center",
    workerClassName:
      "right-[-2%] bottom-0 w-[54%] max-w-none md:right-[-2%] md:w-[58%] lg:right-[-1%] lg:w-[56%]",
    titleClassName:
      "max-w-[540px] text-[54px] leading-[0.92] md:text-[78px] lg:text-[70px] xl:text-[78px]",
    titleWrapClassName: "left-[36%] top-[16%] w-[39%]",
    descriptionClassName: "mt-[88px] md:mt-[108px] lg:mt-[138px]",
  },
  {
    bgPosition: "70% center",
    workerClassName:
      "right-[3%] bottom-0 w-[34%] max-w-none md:right-[4%] md:w-[37%] lg:right-[5%] lg:w-[35%]",
    titleClassName:
      "max-w-[560px] text-[56px] leading-[0.92] md:text-[80px] lg:text-[72px] xl:text-[80px]",
    titleWrapClassName: "left-[57%] top-[15%] w-[31%]",
    descriptionClassName: "mt-[88px] md:mt-[108px] lg:mt-[138px]",
  },
  {
    bgPosition: "73% center",
    workerClassName:
      "right-[1%] bottom-0 w-[39%] max-w-none md:right-[2%] md:w-[42%] lg:right-[2%] lg:w-[40%]",
    titleClassName:
      "max-w-[520px] text-[54px] leading-[0.92] md:text-[78px] lg:text-[70px] xl:text-[76px]",
    titleWrapClassName: "left-[54%] top-[15%] w-[32%]",
    descriptionClassName: "mt-[88px] md:mt-[108px] lg:mt-[138px]",
  },
];

const fadeSlideTransition = {
  duration: 0.55,
  ease: [0.25, 0.74, 0.22, 0.99],
};

function ArrowIcon({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`h-3.5 w-3.5 ${direction === "prev" ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

export default function SustainabilityShowcase({ slides }: SustainabilityShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const slide = slides[activeIndex];
  const visual = visualByIndex[activeIndex % visualByIndex.length];

  const goToPrevious = () => {
    setActiveIndex((current) => (current === 0 ? slides.length - 1 : current - 1));
  };

  const goToNext = () => {
    setActiveIndex((current) => (current === slides.length - 1 ? 0 : current + 1));
  };

  return (
    <section className="bg-white px-0 py-8 md:py-12 lg:py-16">
      <div className="overflow-hidden bg-white">
        <div className="relative grid min-h-[720px] grid-cols-1 lg:grid-cols-[50.4%_49.6%]">
          <div className="absolute left-0 right-0 top-0 z-30 px-[30px] pt-8 md:px-[60px] md:pt-10 xl:px-[140px] lg:pt-[34px]">
            <div className="flex items-center justify-between border-b border-white/25 pb-4 text-[13px] leading-none tracking-[-0.02em] text-white/95 md:text-[14px]">
              <span>{slide.category}</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={`counter-${activeIndex}`}
                  initial={{ opacity: 0, y: -18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 14 }}
                  transition={fadeSlideTransition}
                  className="text-right text-white/90"
                >
                  {activeIndex + 1}/{slides.length}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <div className="relative z-10 flex flex-col bg-[#b4042f] px-8 py-8 text-white md:px-12 md:py-10 lg:px-[72px] lg:py-[66px] lg:pt-[116px] xl:pl-[140px]">

            <div className="mt-14 flex items-center gap-3 md:mt-16 lg:mt-[54px]">
              <button
                type="button"
                onClick={goToPrevious}
                aria-label="Previous slide"
                className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white text-[#b4042f] transition-colors hover:bg-white/90"
              >
                <ArrowIcon direction="prev" />
              </button>
              <button
                type="button"
                onClick={goToNext}
                aria-label="Next slide"
                className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white text-[#b4042f] transition-colors hover:bg-white/90"
              >
                <ArrowIcon direction="next" />
              </button>
            </div>

            <div className={`max-w-[420px] ${visual.descriptionClassName}`}>
              <AnimatePresence mode="wait">
                <motion.p
                  key={`description-${activeIndex}`}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -22 }}
                  transition={fadeSlideTransition}
                  className="text-[15px] leading-[1.14] tracking-[-0.02em] text-white md:text-[16px] lg:text-[17px]"
                >
                  {slide.description}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <div className="relative min-h-[720px] overflow-hidden bg-[#667789]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`background-${activeIndex}`}
                initial={{ opacity: 0.35, scale: 1.035 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.2, scale: 0.985 }}
                transition={fadeSlideTransition}
                className="absolute inset-0"
              >
                <Image
                  src={introBackground as StaticImageData}
                  alt="Industrial background"
                  fill
                  priority
                  className="object-cover"
                  style={{ objectPosition: visual.bgPosition }}
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(77,92,107,0.12)_0%,rgba(57,72,84,0.04)_100%)]" />
            <div className="absolute inset-y-0 left-0 w-[22%] bg-[linear-gradient(90deg,rgba(23,35,47,0.42)_0%,rgba(23,35,47,0.18)_46%,rgba(23,35,47,0)_100%)]" />

            <div className="absolute inset-0 z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`worker-${activeIndex}`}
                  initial={{ opacity: 0, x: 44, scale: 0.96 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 24, scale: 0.98 }}
                  transition={fadeSlideTransition}
                  className="absolute inset-0"
                >
                  <Image
                    src={workerImage as StaticImageData}
                    alt="Field worker"
                    priority
                    className={`absolute h-auto ${visual.workerClassName}`}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="absolute bottom-8 right-8 z-20 md:bottom-10 md:right-10 lg:bottom-[66px] lg:right-[58px]">
              <button
                type="button"
                className="inline-flex h-[62px] min-w-[210px] items-center justify-between gap-6 bg-[#47596b] px-7 text-[15px] font-medium tracking-[-0.02em] text-white transition-colors hover:bg-[#3f4f60] md:min-w-[232px] lg:h-[64px] lg:min-w-[244px] lg:px-8"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#47596b]">
                  <ArrowIcon direction="next" />
                </span>
                <span className="flex-1 text-center">{slide.cta}</span>
              </button>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 z-20 hidden lg:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={`title-${activeIndex}`}
                initial={{ opacity: 0, y: 30, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -18, scale: 0.99 }}
                transition={fadeSlideTransition}
                className={`absolute ${visual.titleWrapClassName}`}
              >
                <h2 className={`font-medium tracking-[-0.06em] text-white ${visual.titleClassName}`}>
                  {slide.title}
                </h2>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}