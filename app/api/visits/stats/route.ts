import { NextResponse } from "next/server";
import { getVisitStats } from "@/app/api/visits/_lib/visitStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const stats = await getVisitStats();
    return NextResponse.json(stats, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        storage: "disabled",
        persistent: false,
        error: error instanceof Error ? error.message : "Visitor stats failed.",
      },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}
