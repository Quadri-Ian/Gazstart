"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import angle01 from "@/assets/Consistent image angles/screenshot-1775918998528_no_bg_yzz2i7po.png";
import angle02 from "@/assets/Consistent image angles/screenshot-1775919036038_no_bg_x9zwln2p.png";
import angle03 from "@/assets/Consistent image angles/screenshot-1775919056067_no_bg_sb4ltnnp.png";
import angle04 from "@/assets/Consistent image angles/screenshot-1775919081855_no_bg_5c6eer49.png";
import angle05 from "@/assets/Consistent image angles/screenshot-1775919102720_no_bg_62gejg57.png";
import angle06 from "@/assets/Consistent image angles/screenshot-1775919124400_no_bg_j3cd4eyq.png";
import angle07 from "@/assets/Consistent image angles/screenshot-1775919145620_no_bg_gg90dw32.png";
import angle08 from "@/assets/Consistent image angles/screenshot-1775919162104_no_bg_a6a9utmh.png";
import angle09 from "@/assets/Consistent image angles/screenshot-1775919188172_no_bg_fwwftom4.png";
import angle10 from "@/assets/Consistent image angles/screenshot-1775919207332_no_bg_ybysdedx.png";
import angle11 from "@/assets/Consistent image angles/screenshot-1775919222401_no_bg_jvolfnp2.png";
import useMobileHorizontalReveal from "@/components/ui/useMobileHorizontalReveal";

const rigFrames = [angle01, angle02, angle03, angle04, angle05, angle06, angle07, angle08, angle09, angle10, angle11];

export default function StatsSection() {
  const t = useTranslations("home");
  const [displayProgress, setDisplayProgress] = useState(0.5);
  const animationFrameRef = useRef<number | null>(null);
  const displayProgressRef = useRef(0.5);
  const targetProgressRef = useRef(0.5);
  const metricRevealRef = useMobileHorizontalReveal<HTMLParagraphElement>(92);

  useEffect(() => {
    let lastTime = window.performance.now();

    const animate = (currentTime: number) => {
      const delta = currentTime - lastTime;
      lastTime = currentTime;

      const smoothing = 1 - Math.exp(-delta / 180);
      const next =
        displayProgressRef.current +
        (targetProgressRef.current - displayProgressRef.current) * smoothing;

      displayProgressRef.current = Math.abs(targetProgressRef.current - next) < 0.0004 ? targetProgressRef.current : next;
      setDisplayProgress(displayProgressRef.current);

      animationFrameRef.current = window.requestAnimationFrame(animate);
    };

    animationFrameRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const frameState = useMemo(() => {
    const exactIndex = displayProgress * (rigFrames.length - 1);
    const baseIndex = Math.floor(exactIndex);
    const nextIndex = Math.min(baseIndex + 1, rigFrames.length - 1);
    const blend = exactIndex - baseIndex;

    return {
      baseFrame: rigFrames[baseIndex],
      nextFrame: rigFrames[nextIndex],
      blend,
      isSingleFrame: baseIndex === nextIndex,
    };
  }, [displayProgress]);

  const handleMove = (event: React.PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const progress = (event.clientX - bounds.left) / bounds.width;
    targetProgressRef.current = Math.max(0, Math.min(1, progress));
  };

  const handleLeave = () => {
    targetProgressRef.current = 0.5;
  };

  return (
    <section className="bg-white pb-20 pt-24 md:pb-28 md:pt-28 lg:pt-32" id="performance">
      <div
        className="container-h relative overflow-hidden rounded-t-[28px] bg-white px-5 pt-8 sm:px-[60px] md:min-h-[760px] md:pt-10 lg:min-h-[840px] lg:px-[150px] lg:pt-12"
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
      >
        <div className="title-border title-border--grey relative z-20 mb-5 md:mb-10 lg:mb-12">
          <h2 className="text-[10px] font-normal tracking-[-0.02em] text-[#b4042f] md:text-[11px] lg:text-[12px]">{t("statsDrilled")}</h2>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[58px] z-10 overflow-hidden opacity-[0.46] md:top-[62px] md:opacity-[0.78] lg:top-[70px]">
          <div className="absolute inset-0">
            <Image
              src={frameState.baseFrame}
              alt=""
              aria-hidden="true"
              fill
              className="select-none object-contain object-center scale-[1.04] md:scale-[1.16] lg:scale-[1.12]"
              priority={false}
              sizes="100vw"
              style={{ opacity: frameState.isSingleFrame ? 1 : 1 - frameState.blend }}
            />

            {!frameState.isSingleFrame ? (
              <Image
                src={frameState.nextFrame}
                alt=""
                aria-hidden="true"
                fill
                className="select-none object-contain object-center scale-[1.04] md:scale-[1.16] lg:scale-[1.12]"
                priority={false}
                sizes="100vw"
                style={{ opacity: frameState.blend }}
              />
            ) : null}
          </div>
        </div>

        <div className="relative z-20 min-h-[470px] pb-8 md:min-h-[600px] md:pb-10 lg:min-h-[680px] lg:pb-14">
          <div className="pt-10 md:pt-5 lg:pt-6">
            <p
              ref={metricRevealRef}
              className="-ml-[7px] whitespace-nowrap text-[94px] font-[350] leading-[0.84] tracking-[-0.09em] text-[#b4042f] md:ml-0 md:text-[104px] md:leading-[0.9] md:tracking-[-0.075em] lg:text-[148px]"
            >
              {t("statsDrilledValue")}
              <span className="align-top text-[0.32em] leading-none">+</span>
            </p>
          </div>

          <div className="mt-[214px] grid grid-cols-2 gap-6 md:mt-8 md:grid-cols-[minmax(240px,1fr)_minmax(160px,1fr)_minmax(240px,1fr)] md:gap-10 lg:mt-12">
            <div>
              <p className="border-t border-[#dfe5eb] pb-4 pt-4 text-[13px] font-normal tracking-[-0.02em] text-[#445567] md:pb-6 md:pt-5 md:text-[15px]">
                {t("statsAnnualDrillingLabel")}
              </p>
              <p className="whitespace-nowrap text-[20px] font-normal leading-[0.95] tracking-[-0.05em] text-[#394858] md:text-[60px] lg:text-[66px]">
                {t("statsAnnualDrillingValue")}
              </p>
            </div>

            <div className="hidden md:block" />

            <div>
              <p className="border-t border-[#dfe5eb] pb-4 pt-4 text-[13px] font-normal tracking-[-0.02em] text-[#445567] md:pb-6 md:pt-5 md:text-[15px]">
                {t("statsTotalInvestmentsLabel")}
              </p>
              <p className="whitespace-nowrap text-[20px] font-normal leading-[0.95] tracking-[-0.05em] text-[#394858] md:text-[60px] lg:text-[66px]">
                {t("statsTotalInvestmentsValue")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
