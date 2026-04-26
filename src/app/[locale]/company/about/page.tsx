
import type { Metadata } from "next";
import { redirectToLegacy } from "@/lib/legacyRedirect";

export const metadata: Metadata = {
  title: "About Us",
};

export default function AboutPage() {
  redirectToLegacy("/legacy/naftagaz.com/en/company/index.html");
}
