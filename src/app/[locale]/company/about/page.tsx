import type { Metadata } from "next";
import { redirectToLegacy } from "@/lib/legacyRedirect";

export const metadata: Metadata = {
  title: "About Naftagaz",
};

export default function AboutPage() {
  redirectToLegacy("/legacy/naftagaz.com/en/company/index.html");
}

