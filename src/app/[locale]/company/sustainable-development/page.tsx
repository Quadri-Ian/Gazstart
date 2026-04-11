import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Hero from "@/components/ui/Hero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SustainabilityShowcase from "@/components/company/SustainabilityShowcase";

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

  const slides =
    locale === "ru"
      ? [
          {
            category: "Социальная ответственность",
            title: "Охрана труда",
            description:
              "Безопасность прежде всего. Защита жизни и здоровья персонала и подрядчиков, сохранность оборудования, надежность производственных процессов и охрана окружающей среды являются ключевыми приоритетами компании. Цель политики в области охраны труда и промышленной безопасности — нулевой травматизм и отсутствие аварий на всех уровнях.",
            cta: "Подробнее",
          },
          {
            category: "Экологическая ответственность",
            title: "Защита окружающей среды",
            description:
              "Компания снижает воздействие на окружающую среду за счет контроля выбросов, рационального обращения с отходами и постоянного повышения экологической эффективности производственных площадок.",
            cta: "Подробнее",
          },
          {
            category: "Социальная ответственность",
            title: "Развитие персонала",
            description:
              "Системная подготовка кадров, повышение квалификации и программы поддержки сотрудников помогают формировать сильные команды и устойчивую производственную культуру.",
            cta: "Подробнее",
          },
          {
            category: "Корпоративное управление",
            title: "Ответственное управление",
            description:
              "Прозрачные процессы, этические стандарты и последовательное управление рисками обеспечивают устойчивое развитие компании и доверие партнеров.",
            cta: "Подробнее",
          },
        ]
      : [
          {
            category: "Social Responsibility",
            title: "Occupational Safety",
            description:
              "Safety first. Protection of life and health of GazStart personnel and contractors, integrity of assets, reliability of equipment and environmental protection are critical to our company’s sustainable development. The target of our occupational safety policy is zero injuries and accidents across all levels.",
            cta: "Learn more",
          },
          {
            category: "Environmental Stewardship",
            title: "Environmental Care",
            description:
              "We reduce environmental impact through emissions control, waste management, and continuous upgrades that improve the ecological performance of our operational sites.",
            cta: "Learn more",
          },
          {
            category: "Social Responsibility",
            title: "People Development",
            description:
              "Training, professional development, and support programs help us build strong teams and sustain a culture of accountability, competence, and safe operations.",
            cta: "Learn more",
          },
          {
            category: "Corporate Governance",
            title: "Responsible Governance",
            description:
              "Transparent decision-making, ethical standards, and disciplined risk management support long-term stability and trusted partnerships.",
            cta: "Learn more",
          },
        ];

  return (
    <>
      <Hero title={t("heroTitle")} subtitle={t("heroSubtitle")} />
      <ScrollReveal className="bg-white" direction="up">
        <SustainabilityShowcase slides={slides} />
      </ScrollReveal>
    </>
  );
}
