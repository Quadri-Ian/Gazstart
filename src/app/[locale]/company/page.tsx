import type { Metadata } from "next";
import { redirectToLegacy } from "@/lib/legacyRedirect";

export const metadata: Metadata = {
  title: "Company",
};

export default function CompanyPage() {
  redirectToLegacy("/legacy/naftagaz.com/en/company/index.html");
}
