import type { Metadata } from "next";
import { redirectToLegacy } from "@/lib/legacyRedirect";

export const metadata: Metadata = {
  title: "Services",
};

export default function ServicePage() {
  redirectToLegacy("/legacy/naftagaz.com/en/services/service/index.html");
}
