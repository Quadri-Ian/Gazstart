"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import introBackground from "@/assets/intro-background-xxxl-min.jpg";
import workerImage from "@/assets/man-1-xxxl.png";

type Slide = {
  category: string;
  title: string;
  description: string;
  cta: string;
};

interface SustainabilityShowcaseProps {
  slides: Slide[];
}

const visualByIndex: Array<{
  bgPosition: string;
  workerClassName: string;
  titleClassName: string;
}> = [
  {
    bgPosition: "72% center",
    workerClassName:
      "right-[-1%] bottom-0 w-[62%] max-w-none md:right-[-2%] md:w-[66%] lg:right-[-1%] lg:w-[63%]",
    titleClassName:
      "left-[11%] top-[14%] max-w-[420px] text-[56px] leading-[0.92] md:text-[72px] lg:text-[78px]",
  },
  {
    bgPosition: "74% center",
    workerClassName:
      "right-[1%] bottom-0 w-[58%] max-w-none md:right-[0%] md:w-[63%] lg:right-[1%] lg:w-[60%]",
    titleClassName:
      "left-[11%] top-[15%] max-w-[410px] text-[52px] leading-[0.94] md:text-[68px] lg:text-[74px]",
  },
  {
    bgPosition: "70% center",
    workerClassName:
      "right-[0%] bottom-0 w-[60%] max-w-none md:right-[-1%] md:w-[64%] lg:right-[0%] lg:w-[61%]",
    titleClassName:
      "left-[11%] top-[14%] max-w-[380px] text-[50px] leading-[0.94] md:text-[66px] lg:text-[72px]",
  },
  {
    bgPosition: "73% center",
    workerClassName:
      "right-[0%] bottom-0 w-[59%] max-w-none md:right-[0%] md:w-[63%] lg:right-[1%] lg:w-[60%]",
    titleClassName:
      "left-[11%] top-[15%] max-w-[420px] text-[50px] leading-[0.94] md:text-[66px] lg:text-[72px]",
  },
];

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
    <section className="bg-white px-4 py-8 md:px-6 md:py-12 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-[1536px] overflow-hidden rounded-[18px] bg-white shadow-[0_18px_60px_rgba(10,18,28,0.08)] md:rounded-[22px]">
        <div className="grid min-h-[720px] grid-cols-1 lg:grid-cols-[50.4%_49.6%]">
          <div className="flex flex-col bg-[#b4042f] px-8 py-8 text-white md:px-12 md:py-10 lg:px-[60px] lg:py-[62px]">
            <div className="max-w-[420px]">
              <div className="border-b border-white/25 pb-4 text-[13px] leading-none tracking-[-0.02em] text-white/95 md:text-[14px]">
                {slide.category}
              </div>
            </div>

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

            <div className="mt-auto max-w-[420px] pt-16 md:pt-20 lg:pt-24">
              <p className="text-[15px] leading-[1.14] tracking-[-0.02em] text-white md:text-[16px] lg:text-[17px]">
                {slide.description}
              </p>
            </div>
          </div>

          <div className="relative min-h-[720px] overflow-hidden bg-[#667789]">
            <Image
              src={introBackground as StaticImageData}
              alt="Industrial background"
              fill
              priority
              className="object-cover"
              style={{ objectPosition: visual.bgPosition }}
            />

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(77,92,107,0.12)_0%,rgba(57,72,84,0.04)_100%)]" />
            <div className="absolute inset-y-0 left-0 w-[22%] bg-[linear-gradient(90deg,rgba(23,35,47,0.42)_0%,rgba(23,35,47,0.18)_46%,rgba(23,35,47,0)_100%)]" />

            <div className="absolute left-0 right-0 top-0 z-20 flex items-start justify-end px-8 pt-8 md:px-10 md:pt-10 lg:px-12 lg:pt-[30px]">
              <div className="w-full border-b border-white/25 pb-4 text-right text-[13px] leading-none tracking-[-0.02em] text-white/90 md:text-[14px]">
                {activeIndex + 1}/{slides.length}
              </div>
            </div>

            <h2
              className={`absolute z-20 font-medium tracking-[-0.06em] text-white ${visual.titleClassName}`}
            >
              {slide.title}
            </h2>

            <div className="absolute inset-0 z-10">
              <Image
                src={workerImage as StaticImageData}
                alt="Field worker"
                priority
                className={`absolute h-auto ${visual.workerClassName}`}
              />
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
        </div>
      </div>
    </section>
  );
}