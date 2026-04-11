import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import HeroSection from "@/components/home/HeroSection";
import LocationsSection from "@/components/home/LocationsSection";
import ManagementSlider from "@/components/home/ManagementSlider";
import StatsSection from "@/components/home/StatsSection";
import PressSection from "@/components/home/PressSection";
import PartnersSection from "@/components/home/PartnersSection";
import SustainabilityShowcase from "@/components/company/SustainabilityShowcase";
import { getSustainabilitySlides } from "@/components/company/sustainabilitySlides";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return {
    title: t("heroTitle"),
    description: t("heroSubtitle"),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <HeroSection />
      <LocationsSection />
      <ManagementSlider />
      <StatsSection />
      <SustainabilityShowcase slides={getSustainabilitySlides(locale)} />
      <PressSection />
      <PartnersSection />
    </>
  );
}
