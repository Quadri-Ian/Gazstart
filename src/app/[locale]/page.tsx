import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Blueflare – energy and oilfield services company",
  description:
    "An independent oilfield service company engaged in construction of wells of all types and any complexity.",
};

export default async function HomePage() {
  redirect("/");
}
