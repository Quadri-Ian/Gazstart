import { serveLegacyHtml } from "@/lib/serveLegacyHtml";

export const dynamic = "force-dynamic";

export async function GET() {
  return serveLegacyHtml("legacy/naftagaz.com/en/career/hall-of-fame/index.html");
}
