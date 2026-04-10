import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Hero from "@/components/ui/Hero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TiltCard from "@/components/ui/TiltCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "drilling" });
  return { title: t("title") };
}

export default async function DrillingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "drilling" });

  const services = [
    {
      title: "Directional Drilling",
      desc: "Precision steered wells using the latest MWD/LWD technology.",
      icon: "🔄",
    },
    {
      title: "Vertical Drilling",
      desc: "Cost-effective vertical wells with optimized rate of penetration.",
      icon: "⬇️",
    },
    {
      title: "Horizontal Drilling",
      desc: "Extended reach and horizontal wells for unconventional reservoirs.",
      icon: "➡️",
    },
    {
      title: "Offshore Drilling",
      desc: "Jackup and semi-submersible operations in challenging marine environments.",
      icon: "🌊",
    },
    {
      title: "Workover Services",
      desc: "Recompletion, stimulation, and well remediation operations.",
      icon: "🔧",
    },
    {
      title: "Data & Analytics",
      desc: "Real-time formation evaluation and drilling optimization.",
      icon: "📈",
    },
  ];

  return (
    <>
      <Hero title={t("heroTitle")} subtitle={t("heroSubtitle")} />
      <section className="bg-dark-900 py-24">
        <div className="mx-auto max-w-7xl px-4">
          <ScrollReveal className="mb-12">
            <h2 className="text-3xl font-bold text-white">Our Drilling Capabilities</h2>
            <p className="mt-2 max-w-2xl text-white/60">
              We offer a comprehensive suite of drilling services designed to maximize efficiency
              and minimize risk across all reservoir types and operating environments.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.1}>
                <TiltCard className="h-full rounded-lg border border-white/10 bg-dark-800 p-6 transition-colors hover:border-primary-500/30">
                  <div className="mb-3 text-3xl">{s.icon}</div>
                  <h3 className="mb-2 text-lg font-semibold text-white">{s.title}</h3>
                  <p className="text-sm text-white/60">{s.desc}</p>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
