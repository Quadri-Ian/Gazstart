import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function SocialResponsibilitySection() {
  const t = useTranslations("home");
  const locale = useLocale();

  return (
    <section className="relative w-full overflow-hidden bg-brand-dark">
      {/* Full-bleed background: abstract industrial gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a2530] via-brand-dark to-[#2a3d4e]" />

      {/* Abstract pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg viewBox="0 0 800 500" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
          {/* Industrial circles */}
          <circle cx="600" cy="250" r="300" stroke="white" strokeWidth="1" fill="none" />
          <circle cx="600" cy="250" r="200" stroke="white" strokeWidth="0.5" fill="none" />
          <circle cx="600" cy="250" r="100" stroke="white" strokeWidth="0.5" fill="none" />
          {/* Cross hairs */}
          <line x1="500" y1="250" x2="700" y2="250" stroke="white" strokeWidth="0.5" />
          <line x1="600" y1="150" x2="600" y2="350" stroke="white" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: big heading */}
          <ScrollReveal>
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-brand-red">CSR</p>
            <h2 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              {t("csrTitle")}
            </h2>
          </ScrollReveal>

          {/* Right: red overlay caption + CTA */}
          <ScrollReveal delay={0.2} className="flex flex-col justify-center">
            {/* Red accent caption block */}
            <div className="relative mb-8 border-l-4 border-brand-red pl-6">
              <p className="text-base leading-relaxed text-white/70 md:text-lg">
                {t("csrSubtitle")}
              </p>
            </div>

            {/* CTA */}
            <Link
              href={`/${locale}/company/sustainable-development`}
              className="group inline-flex w-fit items-center gap-3 bg-brand-red px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#8b0424]"
            >
              {t("csrCta")}
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
