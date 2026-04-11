import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Hero from "@/components/ui/Hero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SustainabilityShowcase from "@/components/company/SustainabilityShowcase";
import { getSustainabilitySlides } from "@/components/company/sustainabilitySlides";

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

  return (
    <>
      <Hero title={t("heroTitle")} subtitle={t("heroSubtitle")} />
      <ScrollReveal className="bg-white" direction="up">
        <SustainabilityShowcase slides={getSustainabilitySlides(locale)} />
      </ScrollReveal>
    </>
  );
}
