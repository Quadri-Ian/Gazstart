import type { Metadata } from "next";
import { redirectToLegacy } from "@/lib/legacyRedirect";

export const metadata: Metadata = {
  title: "News",
};

export default function NewsPage() {
  redirectToLegacy("/legacy/naftagaz.com/en/news/index.html");
}
