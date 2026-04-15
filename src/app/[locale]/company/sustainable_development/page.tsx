import type { Metadata } from "next";
import { redirectToLegacy } from "@/lib/legacyRedirect";

export const metadata: Metadata = {
  title: "Sustainable Development",
};

export default function SustainableDevelopmentAliasPage() {
  redirectToLegacy("/legacy/naftagaz.com/en/company/sustainable_development/index.html");
}
