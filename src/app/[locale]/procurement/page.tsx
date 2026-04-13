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
  const t = await getTranslations({ locale, namespace: "procurement" });
  return { title: t("title") };
}

export default async function ProcurementPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "procurement" });

  const categories = [
    { title: "Drilling Equipment", desc: "Drill bits, BHA components, casing, tubing, and surface equipment." },
    { title: "Chemicals & Fluids", desc: "Drilling fluids, completion chemicals, and specialty additives." },
    { title: "Safety Equipment", desc: "PPE, emergency response equipment, and safety systems." },
    { title: "Technology & IT", desc: "Software, sensors, data management, and field communication systems." },
    { title: "Support Services", desc: "Catering, logistics, accommodation, and site maintenance." },
    { title: "Professional Services", desc: "Engineering consulting, inspection, and technical training." },
  ];

  return (
    <>
      <Hero title={t("heroTitle")} subtitle={t("heroSubtitle")} />
      <section className="bg-dark-900 py-24">
        <div className="mx-auto max-w-7xl px-4">
          <ScrollReveal className="mb-8">
            <h2 className="text-3xl font-bold text-white">Supplier Information</h2>
            <p className="mt-2 max-w-2xl text-white/60">
              We partner with reliable suppliers who share our commitment to quality, safety, and
              sustainability. Our procurement process is transparent, competitive, and fair.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="mb-12">
            <div className="rounded-lg border border-primary-500/30 bg-primary-500/5 p-6">
              <h3 className="mb-2 font-semibold text-white">Become a Supplier</h3>
              <p className="text-sm text-white/70">
                To register as a supplier or learn about current tender opportunities, please send
                your company profile and qualifications to procurement@blueflare.com
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, i) => (
              <ScrollReveal key={cat.title} delay={i * 0.1}>
                <div className="rounded-lg border border-white/10 bg-dark-800 p-6">
                  <div className="mb-3 h-1 w-10 bg-primary-500" />
                  <h3 className="mb-2 font-semibold text-white">{cat.title}</h3>
                  <p className="text-sm text-white/60">{cat.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
