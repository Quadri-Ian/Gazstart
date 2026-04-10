import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TiltCard from "@/components/ui/TiltCard";

export default function LocationsSection() {
  const t = useTranslations("home");

  const locations = [
    { name: t("locationsRegion1"), description: t("locationsRegion1Desc") },
    { name: t("locationsRegion2"), description: t("locationsRegion2Desc") },
    { name: t("locationsRegion3"), description: t("locationsRegion3Desc") },
    { name: t("locationsRegion4"), description: t("locationsRegion4Desc") },
  ];

  return (
    <section className="w-full bg-brand-dark py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Section header */}
        <ScrollReveal className="mb-10 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-brand-red">Operations</p>
            <h2 className="text-3xl font-bold text-white md:text-4xl">{t("locationsTitle")}</h2>
            <p className="mt-2 text-sm text-white/50">{t("locationsSubtitle")}</p>
          </div>
          {/* Map silhouette placeholder */}
          <div className="hidden h-16 w-40 items-center justify-center rounded border border-white/10 bg-white/5 md:flex">
            <svg className="h-10 w-10 text-white/20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          </div>
        </ScrollReveal>

        {/* Masonry-like grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {locations.map((loc, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <TiltCard
                className={`flex flex-col justify-between rounded border border-white/10 bg-brand-nav/60 p-6 ${
                  i % 3 === 0 ? "min-h-[180px]" : i % 3 === 1 ? "min-h-[220px]" : "min-h-[200px]"
                }`}
              >
                <div>
                  <div className="mb-4 h-0.5 w-8 bg-brand-red" />
                  <h3 className="text-base font-semibold text-white">{loc.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{loc.description}</p>
                </div>
                <div className="mt-6 flex h-7 w-7 items-center justify-center rounded-full border border-white/20">
                  <svg className="h-3 w-3 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
