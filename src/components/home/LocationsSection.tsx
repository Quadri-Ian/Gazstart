import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TiltCard from "@/components/ui/TiltCard";

const locations = [
  { name: "Western Siberia", description: "Key drilling operations in major oil fields" },
  { name: "Volga Region", description: "Gas extraction and processing facilities" },
  { name: "Yamal Peninsula", description: "Arctic drilling and LNG infrastructure" },
  { name: "Caspian Region", description: "Offshore and onshore exploration projects" },
];

export default function LocationsSection() {
  const t = useTranslations("home");

  return (
    <section className="bg-dark-900 py-24">
      <div className="mx-auto max-w-7xl px-4">
        <ScrollReveal className="mb-4">
          <p className="text-xs uppercase tracking-widest text-primary-500">Operations</p>
        </ScrollReveal>
        <ScrollReveal delay={0.1} className="mb-12">
          <h2 className="text-3xl font-bold text-white md:text-4xl">{t("locationsTitle")}</h2>
          <p className="mt-2 text-white/60">{t("locationsSubtitle")}</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {locations.map((loc, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <TiltCard className="h-full rounded-lg border border-white/10 bg-dark-800 p-6">
                <div className="mb-3 h-1 w-12 bg-primary-500" />
                <h3 className="text-lg font-semibold text-white">{loc.name}</h3>
                <p className="mt-2 text-sm text-white/60">{loc.description}</p>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
