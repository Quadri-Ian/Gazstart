import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CountUpStat from "@/components/ui/CountUpStat";

const stats = [
  { end: 6800000, suffix: "+", prefix: "", labelKey: "statsDrilled" },
  { end: 1200, suffix: "+", prefix: "", labelKey: "statsWells" },
  { end: 25, suffix: "", prefix: "", labelKey: "statsYears" },
  { end: 13, suffix: "B+", prefix: "$", labelKey: "statsProjects" },
];

export default function LargeStatsSection() {
  const t = useTranslations("home");

  return (
    <section className="w-full bg-brand-card py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: stats list */}
          <div>
            <ScrollReveal>
              <p className="mb-2 text-xs uppercase tracking-[0.2em] text-brand-red">Performance</p>
              <h2 className="text-3xl font-bold text-brand-dark md:text-4xl">{t("statsTitle")}</h2>
              <p className="mt-3 text-sm text-brand-dark/60">{t("statsSubtitle")}</p>
            </ScrollReveal>

            <div className="mt-10 grid grid-cols-2 gap-8">
              {stats.map((stat, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="border-l-2 border-brand-red pl-4">
                    <CountUpStat
                      end={stat.end}
                      suffix={stat.suffix}
                      prefix={stat.prefix}
                      label={t(stat.labelKey as Parameters<typeof t>[0])}
                      className="text-3xl font-bold text-brand-dark md:text-4xl"
                    />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Right: technical illustration placeholder */}
          <ScrollReveal delay={0.2} className="flex items-center justify-center">
            <div className="relative h-64 w-full max-w-md overflow-hidden rounded border border-brand-dark/10 bg-white shadow-sm md:h-80">
              {/* SVG technical rig illustration */}
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 400 300"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Derrick */}
                <polygon points="200,20 220,260 180,260" fill="#394854" opacity="0.12" />
                <line x1="185" y1="80" x2="215" y2="80" stroke="#394854" strokeWidth="3" opacity="0.2" />
                <line x1="183" y1="130" x2="217" y2="130" stroke="#394854" strokeWidth="3" opacity="0.2" />
                <line x1="181" y1="180" x2="219" y2="180" stroke="#394854" strokeWidth="3" opacity="0.2" />
                {/* Platform */}
                <rect x="140" y="255" width="120" height="15" rx="2" fill="#394854" opacity="0.15" />
                <rect x="120" y="268" width="160" height="10" rx="2" fill="#394854" opacity="0.1" />
                {/* Pipe string */}
                <line x1="200" y1="270" x2="200" y2="290" stroke="#ab052d" strokeWidth="4" opacity="0.6" />
                {/* Drill bit */}
                <polygon points="194,290 200,300 206,290" fill="#ab052d" opacity="0.7" />
                {/* Labels */}
                <text x="240" y="85" fill="#394854" fontSize="10" opacity="0.5">Draw Works</text>
                <text x="240" y="135" fill="#394854" fontSize="10" opacity="0.5">Rotary Table</text>
                <text x="240" y="185" fill="#394854" fontSize="10" opacity="0.5">BOP Stack</text>
                {/* Ground line */}
                <line x1="40" y1="278" x2="360" y2="278" stroke="#394854" strokeWidth="1" opacity="0.15" />
                {/* Red accent dot */}
                <circle cx="200" cy="20" r="6" fill="#ab052d" opacity="0.8" />
              </svg>
              {/* Label */}
              <p className="absolute bottom-3 right-3 text-xs text-brand-dark/30">
                {t("statsIllustrationAlt")}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
