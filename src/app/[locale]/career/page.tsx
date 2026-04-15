import type { Metadata } from "next";
import { redirectToLegacy } from "@/lib/legacyRedirect";

export const metadata: Metadata = {
  title: "Career",
};

export default function CareerAliasPage() {
  redirectToLegacy("/legacy/naftagaz.com/en/career/index.html");
}
