import { NextRequest, NextResponse } from "next/server";
import { trackVisitHeartbeat } from "@/app/api/visits/_lib/visitStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await trackVisitHeartbeat({
      deviceId: String(body?.deviceId || ""),
      path: String(body?.path || "/"),
    });

    return NextResponse.json(result, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Visitor heartbeat failed.",
      },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }
}
