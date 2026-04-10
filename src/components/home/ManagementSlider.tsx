"use client";

import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Carousel from "@/components/ui/Carousel";

const management = [
  {
    name: "Alexander Petrov",
    title: "Chief Executive Officer",
    message:
      "Our commitment to excellence in drilling and oilfield services has positioned GazStart as a trusted partner across the energy industry. We continue to invest in technology and our people to deliver reliable results.",
  },
  {
    name: "Nikolai Grishankov",
    title: "Chief Operations Officer",
    message:
      "Safety, efficiency, and innovation drive everything we do. Our operations teams work tirelessly to meet the highest standards while pushing the boundaries of what's possible in difficult formations.",
  },
];

export default function ManagementSlider() {
  const t = useTranslations("home");

  const slides = management.map((person) => (
    <div
      key={person.name}
      className="flex flex-col gap-6 px-2 py-4 md:flex-row md:items-center md:gap-12"
    >
      <div className="flex-shrink-0">
        <div className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-brand-red/30 bg-brand-nav text-4xl text-white/20">
          👤
        </div>
      </div>
      <div>
        <p className="text-xl font-bold text-white">{person.name}</p>
        <p className="mb-4 text-sm text-brand-red">{person.title}</p>
        <blockquote className="border-l-2 border-brand-red pl-4 italic leading-relaxed text-white/70">
          &ldquo;{person.message}&rdquo;
        </blockquote>
      </div>
    </div>
  ));

  return (
    <section className="border-t border-white/5 bg-brand-dark py-24">
      <div className="mx-auto max-w-7xl px-4">
        <ScrollReveal className="mb-12">
          <p className="mb-2 text-xs uppercase tracking-widest text-brand-red">Leadership</p>
          <h2 className="text-3xl font-bold text-white">{t("managementTitle")}</h2>
        </ScrollReveal>
        <Carousel slides={slides} loop />
      </div>
    </section>
  );
}
