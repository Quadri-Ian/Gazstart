import type { Metadata } from "next";
import { redirectToLegacy } from "@/lib/legacyRedirect";

export const metadata: Metadata = {
  title: "Our Business",
};

export default function OurBusinessPage() {
  redirectToLegacy("/legacy/naftagaz.com/en/company/our-business/index.html");
}
