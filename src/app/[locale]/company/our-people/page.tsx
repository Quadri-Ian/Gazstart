import type { Metadata } from "next";
import { redirectToLegacy } from "@/lib/legacyRedirect";

export const metadata: Metadata = {
  title: "Our People",
};

export default function OurPeoplePage() {
  redirectToLegacy("/legacy/naftagaz.com/en/company/our-people/index.html");
}
