import type { Metadata } from "next";
import { redirectToLegacy } from "@/lib/legacyRedirect";

export const metadata: Metadata = {
  title: "Drilling Services",
};

export default function DrillingPage() {
  redirectToLegacy("/legacy/naftagaz.com/en/services/driling/index.html");
}
