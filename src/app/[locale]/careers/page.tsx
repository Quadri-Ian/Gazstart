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
  const t = await getTranslations({ locale, namespace: "careers" });
  return { title: t("title") };
}

const openings = [
  { title: "Senior Drilling Engineer", location: "Niger Delta", type: "Full-time" },
  { title: "MWD/LWD Specialist", location: "Offshore Lagos", type: "Rotation" },
  { title: "HSE Supervisor", location: "Multiple Locations", type: "Full-time" },
  { title: "Directional Driller", location: "Volga Region", type: "Rotation" },
  { title: "Well Site Geologist", location: "Caspian Region", type: "Rotation" },
  { title: "Procurement Specialist", location: "Moscow (HQ)", type: "Full-time" },
];

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "careers" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  return (
    <>
      <Hero title={t("heroTitle")} subtitle={t("heroSubtitle")} />
      <section className="bg-dark-900 py-24">
        <div className="mx-auto max-w-7xl px-4">
          <ScrollReveal className="mb-12">
            <h2 className="text-3xl font-bold text-white">Open Positions</h2>
            <p className="mt-2 text-white/60">
              Join a team of industry experts committed to excellence, safety, and innovation.
            </p>
          </ScrollReveal>
          <div className="space-y-4">
            {openings.map((job, i) => (
              <ScrollReveal key={job.title} delay={i * 0.05}>
                <div className="flex flex-col justify-between gap-4 rounded-lg border border-white/10 bg-dark-800 p-6 transition-colors hover:border-primary-500/30 md:flex-row md:items-center">
                  <div>
                    <h3 className="font-semibold text-white">{job.title}</h3>
                    <div className="mt-1 flex gap-3">
                      <span className="text-sm text-white/50">📍 {job.location}</span>
                      <span className="text-sm text-white/50">⏱ {job.type}</span>
                    </div>
                  </div>
                  <button className="whitespace-nowrap rounded border border-primary-500 px-4 py-2 text-sm text-primary-400 transition-colors hover:bg-primary-500 hover:text-white">
                    {tCommon("learnMore")}
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
