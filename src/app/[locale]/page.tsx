import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Blueflare – russian oilfield services company",
  description:
    "An independent oilfield service company engaged in construction of wells of all types and any complexity.",
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const mirroredLocale = locale === "en" ? "en" : "en";

  redirect(`/legacy/naftagaz.com/${mirroredLocale}/index.html`);
}
