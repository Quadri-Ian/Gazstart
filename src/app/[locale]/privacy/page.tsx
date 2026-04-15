import type { Metadata } from "next";
import { redirectToLegacy } from "@/lib/legacyRedirect";

export const metadata: Metadata = {
  title: "Privacy",
};

export default function PrivacyPage() {
  redirectToLegacy("/legacy/naftagaz.com/en/privacy/index.html");
}
