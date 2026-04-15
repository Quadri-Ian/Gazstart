import type { Metadata } from "next";
import { redirectToLegacy } from "@/lib/legacyRedirect";

export const metadata: Metadata = {
  title: "Careers",
};

export default function CareersPage() {
  redirectToLegacy("/legacy/naftagaz.com/en/career/index.html");
}

