import { db } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await db.orm.public.User.all(); // Or your ORM's equivalent to fetch all records (e.g., .findMany() or .where(() => true))
    
    const userList = Array.isArray(users) ? users : [];

    const visitorMetric = userList.length;

    const correctTotal = userList.reduce((sum, user) => sum + (Number(user.correctAttempts) || 0), 0);
    const incorrectTotal = userList.reduce((sum, user) => sum + (Number(user.incorrectAttempts) || 0), 0);

    return NextResponse.json({
      visitorCount: visitorMetric,
      correctAttempts: correctTotal,
      incorrectAttempts: incorrectTotal,
    });
  } catch (error) {
    console.error("Failed to fetch metrics:", error);
    return NextResponse.json({ error: "Failed to fetch metrics" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, visitorId } = body;

    if (!body) {
      return NextResponse.json({ error: "Missing request body" }, { status: 400 });
    }

    if (type !== "correct" && type !== "incorrect") {
      return NextResponse.json({ error: "Invalid increment type" }, { status: 400 });
    }

    if (!visitorId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // get current user
    const user = await db.orm.public.User
      .where((u) => u.id.eq(visitorId))
      .first();

    const currentCorrect = user ? Number(user.correctAttempts) || 0 : 0;
    const currentIncorrect = user ? Number(user.incorrectAttempts) || 0 : 0;

    const newCorrectAttempts = type === "correct" ? currentCorrect + 1 : currentCorrect;
    const newIncorrectAttempts = type === "incorrect" ? currentIncorrect + 1 : currentIncorrect;

    const nowIso = new Date().toISOString();

    await db.orm.public.User.where((u) => u.id.eq(visitorId)).upsert({
      create: {
        id: visitorId,
        createdAt: nowIso,
        updatedAt: nowIso,
        lastOnline: nowIso,
        countryOfOrigin: "NaN",
        correctAttempts: newCorrectAttempts,
        incorrectAttempts: newIncorrectAttempts,
        isActive: true,
        role: "USER",
      },
      update: {
        updatedAt: nowIso,
        correctAttempts: newCorrectAttempts,
        incorrectAttempts: newIncorrectAttempts,
      },
    });

    return NextResponse.json({
      correctAttempts: newCorrectAttempts,
      incorrectAttempts: newIncorrectAttempts,
    });

  } catch (error: any) {
    console.error("Error modifying attempts metric:", error?.message, error?.stack);
    return NextResponse.json({ error: "Internal server write error" }, { status: 500 });
  }
}
