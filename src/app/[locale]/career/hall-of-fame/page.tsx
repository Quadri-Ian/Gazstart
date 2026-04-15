import type { Metadata } from "next";
import { redirectToLegacy } from "@/lib/legacyRedirect";

export const metadata: Metadata = {
  title: "Hall of Fame",
};

export default function HallOfFamePage() {
  redirectToLegacy("/legacy/naftagaz.com/en/career/hall-of-fame/index.html");
}
