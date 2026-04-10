"use client";

import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";

const partners = [
  "Gazprom",
  "Rosneft",
  "Lukoil",
  "Novatek",
  "Schlumberger",
  "Halliburton",
  "Baker Hughes",
  "Weatherford",
];

export default function PartnersSection() {
  const t = useTranslations("home");

  return (
    <section className="w-full border-t border-white/5 bg-brand-dark py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <ScrollReveal className="mb-10 text-center">
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-brand-red">
            Clients &amp; Partners
          </p>
          <h2 className="text-2xl font-bold text-white">{t("partnersTitle")}</h2>
        </ScrollReveal>

        {/* Partners strip */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {partners.map((partner) => (
              <div
                key={partner}
                className="flex h-14 min-w-[120px] items-center justify-center border border-white/10 bg-brand-nav/60 px-6 transition-colors hover:border-brand-red/30 hover:bg-brand-nav"
              >
                <span className="text-sm font-medium text-white/40 transition-colors hover:text-white/70">
                  {partner}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
