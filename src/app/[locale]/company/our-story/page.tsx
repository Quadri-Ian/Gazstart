import type { Metadata } from "next";
import { redirectToLegacy } from "@/lib/legacyRedirect";

export const metadata: Metadata = {
  title: "Our Story",
};

export default function OurStoryPage() {
  redirectToLegacy("/legacy/naftagaz.com/en/company/our-story/index.html");
}
