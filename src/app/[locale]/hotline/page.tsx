import type { Metadata } from "next";
import { redirectToLegacy } from "@/lib/legacyRedirect";

export const metadata: Metadata = {
  title: "Hotline",
};

export default function HotlinePage() {
  redirectToLegacy("/legacy/naftagaz.com/en/hotline/index.html");
}
