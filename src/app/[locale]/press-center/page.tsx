import type { Metadata } from "next";
import { redirectToLegacy } from "@/lib/legacyRedirect";

export const metadata: Metadata = {
  title: "Press Center",
};

export default function PressCenterPage() {
  redirectToLegacy("/legacy/naftagaz.com/en/news/index.html");
}

