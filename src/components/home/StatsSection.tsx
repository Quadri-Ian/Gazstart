"use client";

import { Component, type ReactNode, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useTranslations } from "next-intl";

import longtool from "@/assets/longtool.png";

const RigScene = dynamic(() => import("@/components/home/RigScene"), {
  ssr: false,
});

class RigSceneBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {}

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

function RigFallback() {
  return (
    <div className="absolute inset-0 flex items-start justify-center overflow-hidden opacity-[0.34]">
      <Image
        src={longtool}
        alt=""
        aria-hidden="true"
        className="mt-[18px] h-auto w-[560px] select-none md:mt-[-18px] md:w-[780px] lg:mt-[-34px] lg:w-[980px]"
        priority={false}
      />
    </div>
  );
}

export default function StatsSection() {
  const t = useTranslations("home");
  const [mouseX, setMouseX] = useState(0);
  const [canRender3d, setCanRender3d] = useState(false);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const hasWebgl =
      Boolean(window.WebGL2RenderingContext && canvas.getContext("webgl2")) ||
      Boolean(window.WebGLRenderingContext && canvas.getContext("webgl"));

    setCanRender3d(hasWebgl);
  }, []);

  const handleMove = (event: React.MouseEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const progress = (event.clientX - bounds.left) / bounds.width;
    setMouseX(Math.max(-1, Math.min(1, progress * 2 - 1)));
  };

  const handleLeave = () => {
    setMouseX(0);
  };

  return (
    <section className="bg-white pb-20 pt-24 md:pb-28 md:pt-28 lg:pt-32" id="performance">
      <div
        className="container-h relative overflow-hidden rounded-t-[28px] bg-white px-5 pt-8 sm:px-[60px] md:min-h-[760px] md:pt-10 lg:min-h-[840px] lg:px-[150px] lg:pt-12"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <div className="title-border title-border--grey relative z-20 mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-[15px] font-normal tracking-[-0.02em] text-primary-600 md:text-[17px]">{t("statsDrilled")}</h2>
        </div>

        <div className="pointer-events-none absolute inset-0 z-10 opacity-[0.72]">
          {canRender3d ? (
            <RigSceneBoundary fallback={<RigFallback />}>
              <RigScene mouseX={mouseX} />
            </RigSceneBoundary>
          ) : (
            <RigFallback />
          )}
        </div>

        <div className="relative z-20 min-h-[520px] pb-8 md:min-h-[600px] md:pb-10 lg:min-h-[680px] lg:pb-14">
          <div className="pt-3 md:pt-5 lg:pt-6">
            <p className="whitespace-nowrap text-[74px] font-[350] leading-[0.88] tracking-[-0.075em] text-primary-600 md:text-[126px] lg:text-[184px]">
              {t("statsDrilledValue")}
              <span className="align-top text-[0.32em] leading-none">+</span>
            </p>
          </div>

          <div className="mt-10 grid gap-10 md:mt-2 md:grid-cols-[minmax(240px,1fr)_minmax(160px,1fr)_minmax(240px,1fr)] md:gap-10 lg:mt-4">
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
