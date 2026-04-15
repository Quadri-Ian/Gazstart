import type { Metadata } from "next";
import { redirectToLegacy } from "@/lib/legacyRedirect";

export const metadata: Metadata = {
  title: "Contacts",
};

export default function ContactsPage() {
  redirectToLegacy("/legacy/naftagaz.com/en/contacts/index.html");
}

