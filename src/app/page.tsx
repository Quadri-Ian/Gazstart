import RootShell from "@/components/layout/RootShell";
import { loadLegacyMainContent, resolveLegacyPath } from "@/lib/legacyContent";

export const metadata = {
  title: "Blueflare – energy and oilfield services company",
  description:
    "An independent oilfield service company engaged in construction of wells of all types and any complexity.",
};

export default function RootPage() {
  const legacyPath = resolveLegacyPath([]);
  if (!legacyPath) {
    return null;
  }

  const pageData = loadLegacyMainContent(legacyPath, "");

  return (
    <RootShell
      title="Powering the Future of Nigerian Energy."
      subtitle="Blueflare Energy provides high-precision servicing and innovative engineering solutions tailored to the unique demands of the West African oil and gas industry."
      legacyBodyHtml={pageData.bodyHtml}
      routeKey=""
    />
  );
}
