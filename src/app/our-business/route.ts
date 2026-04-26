import { serveLegacyHtml } from "@/lib/serveLegacyHtml";

export const dynamic = "force-dynamic";

export async function GET() {
  return serveLegacyHtml("legacy/naftagaz.com/en/company/our-business/index.html");
}
