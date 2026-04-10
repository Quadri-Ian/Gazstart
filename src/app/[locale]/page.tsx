import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import HeroSection from "@/components/home/HeroSection";
import LocationsSection from "@/components/home/LocationsSection";
import MapStatsSection from "@/components/home/MapStatsSection";
import LargeStatsSection from "@/components/home/LargeStatsSection";
import SocialResponsibilitySection from "@/components/home/SocialResponsibilitySection";
import ManagementSlider from "@/components/home/ManagementSlider";
import PressSection from "@/components/home/PressSection";
import PartnersSection from "@/components/home/PartnersSection";

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

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LocationsSection />
      <MapStatsSection />
      <LargeStatsSection />
      <SocialResponsibilitySection />
      <ManagementSlider />
      <PressSection />
      <PartnersSection />
    </>
  );
}
