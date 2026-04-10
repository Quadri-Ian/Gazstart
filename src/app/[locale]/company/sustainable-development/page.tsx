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
  const t = await getTranslations({ locale, namespace: "sustainable" });
  return { title: t("title") };
}

export default async function SustainableDevelopmentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "sustainable" });

  const pillars = [
    {
      icon: "🌱",
      title: "Environmental Stewardship",
      desc: "Minimizing our ecological footprint through emission reduction, waste management, and biodiversity protection programs.",
    },
    {
      icon: "👥",
      title: "Social Responsibility",
      desc: "Investing in local communities, employee development, and creating opportunities in the regions where we operate.",
    },
    {
      icon: "📊",
      title: "Corporate Governance",
      desc: "Maintaining transparency, ethical business practices, and accountability at every level of the organization.",
    },
    {
      icon: "⚡",
      title: "Energy Transition",
      desc: "Developing capabilities and partnerships that contribute to the long-term energy transition and carbon neutrality goals.",
    },
  ];

  return (
    <>
      <Hero title={t("heroTitle")} subtitle={t("heroSubtitle")} />
      <section className="bg-dark-900 py-24">
        <div className="mx-auto max-w-7xl px-4">
          <ScrollReveal className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-white">Our Sustainability Pillars</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {pillars.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 0.1}>
                <div className="rounded-lg border border-white/10 bg-dark-800 p-8">
                  <div className="mb-4 text-4xl">{p.icon}</div>
                  <h3 className="mb-2 text-xl font-bold text-white">{p.title}</h3>
                  <p className="leading-relaxed text-white/60">{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
