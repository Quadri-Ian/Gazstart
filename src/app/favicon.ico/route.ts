import { NextResponse } from "next/server";

const EMPTY_ICON = new Uint8Array([]);

export function GET() {
	return new NextResponse(EMPTY_ICON, {
		headers: {
			"Content-Type": "image/x-icon",
			"Cache-Control": "public, max-age=0, must-revalidate",
		},
	});
}