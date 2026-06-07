import { NextRequest, NextResponse } from "next/server";
import { trackVisitSession } from "@/app/api/visits/_lib/visitStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await trackVisitSession({
      deviceId: String(body?.deviceId || ""),
      path: String(body?.path || "/"),
      referrer: String(body?.referrer || ""),
    });

    return NextResponse.json(result, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Visitor session failed.",
      },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }
}
