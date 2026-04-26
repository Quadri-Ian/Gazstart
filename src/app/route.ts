import { readFileSync } from "fs";
import { join } from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const filePath = join(process.cwd(), "public", "legacy/naftagaz.com/en/index.html");
  try {
    const html = readFileSync(filePath, "utf-8");
    return new NextResponse(html, {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  } catch (_error) {
    return new NextResponse("404 Not Found", { status: 404 });
  }
}
