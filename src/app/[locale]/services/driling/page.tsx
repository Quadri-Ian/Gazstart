import type { Metadata } from "next";
import { redirectToLegacy } from "@/lib/legacyRedirect";

export const metadata: Metadata = {
  title: "Drilling Services",
};

export default function DrilingAliasPage() {
  redirectToLegacy("/legacy/naftagaz.com/en/services/driling/index.html");
}
