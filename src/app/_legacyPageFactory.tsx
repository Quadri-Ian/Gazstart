import RootShell from "@/components/layout/RootShell";
import { loadLegacyMainContent, resolveLegacyPath } from "@/lib/legacyContent";
import { notFound } from "next/navigation";

export function renderLegacyRoute(routeKey: string) {
  const slug = routeKey ? routeKey.split("/") : [];
  const legacyPath = resolveLegacyPath(slug);
  if (!legacyPath) {
    notFound();
  }

  const pageData = loadLegacyMainContent(legacyPath, routeKey);

  return (
    <RootShell
      title={pageData.title || "Blueflare Energy"}
      subtitle={pageData.subtitle}
      legacyBodyHtml={pageData.bodyHtml}
      routeKey={routeKey}
    />
  );
}
