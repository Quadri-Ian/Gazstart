import fs from "node:fs";
import path from "node:path";
import { notFound, redirect } from "next/navigation";

function normalizeLegacyPath(relativePath: string) {
  return relativePath.replace(/^\/+/, "");
}

function getPublicFilePath(relativePath: string) {
  return path.join(process.cwd(), "public", normalizeLegacyPath(relativePath));
}

export function redirectToLegacy(relativePath: string): never {
  redirect(`/${normalizeLegacyPath(relativePath)}`);
}

export function redirectToFirstExistingLegacy(
  relativePaths: string[],
  fallbackPath?: string,
): never {
  for (const relativePath of relativePaths) {
    if (fs.existsSync(getPublicFilePath(relativePath))) {
      redirectToLegacy(relativePath);
    }
  }

  if (fallbackPath) {
    redirectToLegacy(fallbackPath);
  }

  notFound();
}
