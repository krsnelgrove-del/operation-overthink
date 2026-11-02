// app/api/metrics/route.ts
import { db } from "@/prisma/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const start = performance.now();

    await db.orm.public.User.first();

    const dbLatency = Math.round(performance.now() - start);

    return NextResponse.json(
      {
        latency: dbLatency,
      },
      {
        headers: { "Cache-Control": "no-store, max-age=0" },
      }
    );
  } catch (error) {
    console.warn("Error updating network metrics:", error);
    return NextResponse.json(
      { latency: 15, error: "Failed to fetch network metrics" },
      { status: 500 }
    );
  }
}