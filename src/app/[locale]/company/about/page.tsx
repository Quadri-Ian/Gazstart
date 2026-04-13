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
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title"), description: t("description") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <>
      <Hero title={t("heroTitle")} subtitle={t("heroSubtitle")} />
      <section className="bg-dark-900 py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <ScrollReveal>
              <h2 className="mb-4 text-2xl font-bold text-white">Our History</h2>
              <p className="leading-relaxed text-white/70">
                Founded over two decades ago, Blueflare Energy has grown from a regional drilling
                contractor into a full-service oilfield services provider. Our journey reflects
                the evolution of the energy industry itself—from conventional drilling to complex
                directional wells and advanced formation evaluation.
              </p>
              <p className="mt-4 leading-relaxed text-white/70">
                Today, we operate across major oil and gas basins, employing thousands of skilled
                professionals dedicated to safe, efficient, and environmentally responsible
                operations.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2} direction="left">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: "Founded", value: "2001" },
                  { title: "Employees", value: "5,000+" },
                  { title: "Operating Regions", value: "8" },
                  { title: "Certifications", value: "ISO 9001, 14001" },
                ].map((item) => (
                  <TiltCard
                    key={item.title}
                    className="rounded-lg border border-white/10 bg-dark-800 p-4"
                  >
                    <div className="text-2xl font-bold text-primary-400">{item.value}</div>
                    <div className="mt-1 text-sm text-white/60">{item.title}</div>
                  </TiltCard>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
