import { NextResponse } from "next/server";
import { db } from "@/prisma/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const existing = await db.orm.public.VisitorCount.first();

    return NextResponse.json(
      {
        visitCount: existing?.count ?? 0,
      },
      {
        headers: { "Cache-Control": "no-store, max-age=0" },
      }
    );
  } catch (error) {
    console.error("Error fetching visitor metrics:", error);
    return NextResponse.json(
      { visitCount: 0, error: "Failed to fetch visitor metrics" },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const existing = await db.orm.public.VisitorCount.first();
    const updatedCount = (existing?.count ?? 0) + 1;

    const metric = await db.orm.public.VisitorCount.upsert({
      create: {
        id: "global",
        count: 1,
      },
      update: {
        count: updatedCount,
      },
    });

    return NextResponse.json(
      {
        visitCount: metric.count,
      },
      {
        headers: { "Cache-Control": "no-store, max-age=0" },
      }
    );
  } catch (error) {
    console.error("Error updating visitor metrics:", error);
    return NextResponse.json(
      { visitCount: 0, error: "Failed to increment visitor count" },
      { status: 500 }
    );
  }
}