import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CountUpStat from "@/components/ui/CountUpStat";

export default function StatsSection() {
  const t = useTranslations("home");

  const stats = [
    { end: 6800000, suffix: "+", label: t("statsDrilled") },
    { end: 1200, suffix: "+", label: t("statsWells") },
    { end: 25, suffix: "", label: t("statsYears") },
    { end: 13, suffix: "B+", prefix: "$", label: t("statsProjects") },
  ];

  return (
    <section className="bg-dark-800 py-24">
      <div className="mx-auto max-w-7xl px-4">
        <ScrollReveal className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white">{t("statsTitle")}</h2>
        </ScrollReveal>
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
          {stats.map((stat, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <CountUpStat
                end={stat.end}
                suffix={stat.suffix}
                prefix={stat.prefix}
                label={stat.label}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
