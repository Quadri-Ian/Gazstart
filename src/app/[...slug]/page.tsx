import { notFound } from "next/navigation";
import RootShell from "@/components/layout/RootShell";
import { loadLegacyMainContent, resolveLegacyPath } from "@/lib/legacyContent";

export default async function CatchAllPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const routeSlug = slug || [];
  const routeKey = routeSlug.join("/");

  const legacyPath = resolveLegacyPath(routeSlug);
  if (!legacyPath) {
    notFound();
  }

  const pageData = loadLegacyMainContent(legacyPath, routeKey);

  return (
    <RootShell
      title={pageData.title || "Blueflare Energy"}
      subtitle={pageData.subtitle}
      legacyBodyHtml={pageData.bodyHtml}
    />
  );
}
