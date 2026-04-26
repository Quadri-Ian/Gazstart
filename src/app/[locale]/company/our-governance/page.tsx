import type { Metadata } from "next";
import { redirectToLegacy } from "@/lib/legacyRedirect";

export const metadata: Metadata = {
  title: "Our Governance",
};

export default function OurGovernancePage() {
  redirectToLegacy("/legacy/naftagaz.com/en/company/our-governance/index.html");
}
