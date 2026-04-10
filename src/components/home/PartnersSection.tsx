"use client";

import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Carousel from "@/components/ui/Carousel";

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

  const slides = partners.map((partner) => (
    <div
      key={partner}
      className="flex h-20 items-center justify-center rounded-lg border border-white/10 bg-dark-800 px-8"
    >
      <span className="text-lg font-semibold text-white/40">{partner}</span>
    </div>
  ));

  return (
    <section className="border-t border-white/5 bg-dark-900 py-24">
      <div className="mx-auto max-w-7xl px-4">
        <ScrollReveal className="mb-12 text-center">
          <p className="mb-2 text-xs uppercase tracking-widest text-primary-500">
            Clients & Partners
          </p>
          <h2 className="text-3xl font-bold text-white">{t("partnersTitle")}</h2>
        </ScrollReveal>
        <Carousel slides={slides} slidesPerView={4} spaceBetween={16} autoplay loop />
      </div>
    </section>
  );
}
