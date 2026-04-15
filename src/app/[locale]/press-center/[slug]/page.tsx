import type { Metadata } from "next";
import { redirectToFirstExistingLegacy } from "@/lib/legacyRedirect";

export const metadata: Metadata = {
  title: "News Article",
};

export default async function PressArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;

  redirectToFirstExistingLegacy(
    [
      `/legacy/naftagaz.com/en/news/${slug}/index.html`,
      `/legacy/naftagaz.com/en/news/${slug}.html`,
    ],
    "/legacy/naftagaz.com/en/news/index.html",
  );
}
