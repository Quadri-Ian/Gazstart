import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CountUpStat from "@/components/ui/CountUpStat";

export default function MapStatsSection() {
  const t = useTranslations("home");

  return (
    <section className="w-full overflow-hidden bg-brand-nav">
      <div className="mx-auto max-w-7xl">
        {/* Full-bleed masonry row */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: map silhouette with red circle overlay */}
          <ScrollReveal className="relative flex min-h-[380px] items-center justify-center overflow-hidden bg-brand-dark">
            {/* Abstract map grid */}
            <svg
              className="absolute inset-0 h-full w-full text-white/5"
              viewBox="0 0 600 400"
              fill="none"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Russia outline — stylised blob */}
              <path
                d="M60,120 C80,90 140,70 220,80 C300,90 350,60 420,75 C490,90 540,110 550,150 C560,190 530,220 490,240 C450,260 400,280 360,300 C320,320 270,340 220,330 C170,320 120,300 90,270 C60,240 40,150 60,120Z"
                fill="currentColor"
                opacity="0.15"
              />
              {/* Grid lines */}
              {[80, 160, 240, 320, 400].map((y) => (
                <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="currentColor" strokeWidth="0.5" />
              ))}
              {[100, 200, 300, 400, 500].map((x) => (
                <line key={x} x1={x} y1="0" x2={x} y2="400" stroke="currentColor" strokeWidth="0.5" />
              ))}
            </svg>
            {/* Red circular overlay */}
            <div className="absolute right-12 top-1/2 z-10 -translate-y-1/2">
              <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-brand-red/90 shadow-2xl md:h-44 md:w-44">
                <span className="text-center text-xs font-medium uppercase tracking-wider text-white/90">
                  6 regions
                </span>
              </div>
            </div>
            {/* Pin dots */}
            {[
              { top: "30%", left: "25%" },
              { top: "45%", left: "55%" },
              { top: "60%", left: "35%" },
              { top: "35%", left: "70%" },
            ].map((pos, i) => (
              <div
                key={i}
                className="absolute h-2.5 w-2.5 rounded-full border-2 border-brand-red bg-white/80"
                style={{ top: pos.top, left: pos.left }}
              />
            ))}
          </ScrollReveal>

          {/* Right: big number */}
          <ScrollReveal
            delay={0.15}
            className="flex flex-col justify-center bg-[#1f2d38] px-8 py-16 md:px-12"
          >
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-brand-red">Production</p>
            <div className="text-5xl font-bold leading-none text-white md:text-6xl lg:text-7xl">
              <CountUpStat
                end={6800000}
                suffix="+"
                label=""
                className="text-5xl font-bold text-white md:text-6xl lg:text-7xl"
              />
            </div>
            <p className="mt-4 text-sm text-white/50">{t("mapStatLabel")}</p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
