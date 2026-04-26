import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Procurement",
};

export default function ProcurementPage() {
  redirect("/contacts");
}
