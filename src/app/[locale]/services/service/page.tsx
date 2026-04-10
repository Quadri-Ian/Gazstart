import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Hero from "@/components/ui/Hero";
import ScrollReveal from "@/components/ui/ScrollReveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "service" });
  return { title: t("title") };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "service" });

  const offerings = [
    {
      title: "Well Completion",
      desc: "Perforating, cementing, and completion design for optimal production.",
    },
    {
      title: "Production Optimization",
      desc: "Artificial lift, flow assurance, and production chemistry solutions.",
    },
    {
      title: "Well Integrity",
      desc: "Inspection, testing, and remediation to maintain well safety.",
    },
    {
      title: "Coiled Tubing",
      desc: "CT drilling, stimulation, and fishing operations for all well types.",
    },
  ];

  return (
    <>
      <Hero title={t("heroTitle")} subtitle={t("heroSubtitle")} />
      <section className="bg-dark-900 py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {offerings.map((o, i) => (
              <ScrollReveal key={o.title} delay={i * 0.1}>
                <div className="rounded-lg border border-white/10 bg-dark-800 p-8">
                  <div className="mb-3 h-1 w-10 bg-primary-500" />
                  <h3 className="mb-3 text-xl font-bold text-white">{o.title}</h3>
                  <p className="leading-relaxed text-white/60">{o.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
