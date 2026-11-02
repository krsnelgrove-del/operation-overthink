import { db } from "@/prisma/db";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const visitorMetric = await db.orm.public.User
    .aggregate((agg) => ({ total: agg.count() }))
    .then(res => res.total);

    const correctTotal = await db.orm.public.User
  .where((u) => u.correctAttempts.eq(0))
  .aggregate((agg) => ({ total: agg.count() }))
  .then(res => res.total);

    const incorrectTotal = await db.orm.public.User
  .where((u) => u.incorrectAttempts.eq(0))
  .aggregate((agg) => ({
    total: agg.count(),
  }))
  .then(res => res.total);

    return NextResponse.json({
      visitorCount: visitorMetric,
      correctAttempts: correctTotal,
      incorrectAttempts: incorrectTotal,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch metrics" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, userId } = body;

    if(!body.ok) {
      return NextResponse.json({ error: "Missing request body" }, { status: 400 });
    }

    // Validate req
    if (type !== "correct" && type !== "incorrect") {
      return NextResponse.json({ error: "Invalid increment type" }, { status: 400 });
    }

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const targetColumn = type === "correct" ? "correctAttempts" : "incorrectAttempts";
    
    await db.orm.public.User
      .where((u) => u.id.eq(userId))
      .update((u: any) => ({
        [targetColumn]: u[targetColumn].add(1)
      })).catch((error) => {
        console.warn("Error updating attempts metric:", error);
        return;
      });

    const updatedUser = await db.orm.public.User
      .where((u) => u.id.eq(userId))
      .first().catch((error) => {
        console.warn("Error fetching updated user:", error);
        return null;
      });

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      correctAttempts: updatedUser.correctAttempts,
      incorrectAttempts: updatedUser.incorrectAttempts,
    });

  } catch (error) {
    console.error("Error modifying attempts metric:", error);
    return NextResponse.json({ error: "Internal server write error" }, { status: 500 });
  }
}
