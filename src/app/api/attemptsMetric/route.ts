import { db } from "@/prisma/db";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const metric = await db.orm.public.Attempts.where({ id: "global" }).first();
    return NextResponse.json({
      correctAttempts: metric?.correctAttempts ?? 0,
      incorrectAttempts: metric?.incorrectAttempts ?? 0,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch metrics" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const type: "correct" | "incorrect" = body.type;

    if (type !== "correct" && type !== "incorrect") {
      return NextResponse.json({ error: "Invalid increment type" }, { status: 400 });
    }

    const existing = await db.orm.public.Attempts.where({ id: "global" }).first();

    const metric = await db.orm.public.Attempts.upsert({
      create: {
        id: "global",
        correctAttempts: type === "correct" ? 1 : 0,
        incorrectAttempts: type === "incorrect" ? 1 : 0,
      },
      update: {
        correctAttempts: type === "correct" ? (existing?.correctAttempts ?? 0) + 1 : existing?.correctAttempts ?? 0,
        incorrectAttempts: type === "incorrect" ? (existing?.incorrectAttempts ?? 0) + 1 : existing?.incorrectAttempts ?? 0,
      },
    });

    return NextResponse.json({
      correctAttempts: metric.correctAttempts,
      incorrectAttempts: metric.incorrectAttempts,
    });
  } catch (error) {
    console.error("Error modifying attempts metric:", error);
    return NextResponse.json({ error: "Internal server write error" }, { status: 500 });
  }
}