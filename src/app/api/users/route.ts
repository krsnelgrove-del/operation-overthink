import { NextRequest, NextResponse } from "next/server";
import { db } from "@/prisma/db";
import { Temporal } from "@js-temporal/polyfill";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const returnType = searchParams.get("returnType");

    if (returnType === "getActiveUsers") {
      const usersOnline = await db.orm.public.User.where((u) => u.isActive.eq(true)) .all().then(res => res);

      console.warn("Active users fetched:", usersOnline);

      return NextResponse.json({
        usersOnline: usersOnline.map((user) => ({
          id: user.id,
          countryOfOrigin: user.countryOfOrigin ?? "NaN",
          correctAttempts: user.correctAttempts,
          incorrectAttempts: user.incorrectAttempts,
          isActive: user.isActive,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          lastOnline: user.lastOnline,
        })),
      });
    }

    if(returnType === "userCount") {
      const userCount = await db.orm.public.User.aggregate((agg) => ({ total: agg.count() })).then(res => res.total);
      return NextResponse.json( { visitCount: userCount } );
    }
  }
catch (error) {
    console.error("Error fetching active visitor metrics:", error);
    return NextResponse.json(
      { activeUsers: 0, error: "Failed to fetch visitor metrics" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if(!body) {
        return NextResponse.json({ error: "Missing request body" }, { status: 400 });
    }
    else {
        console.log("Request body received in POST request:", body);
    }

    const visitorId =  body ? body.visitorId : null;
    console.log("Visitor ID received in POST request:", visitorId);

    if (!visitorId) {
      return NextResponse.json({ error: "Missing visitor ID" }, { status: 401 });
    }

    const nowIso = new Date().toString();

    await db.orm.public.User.where((u) => u.id.eq(visitorId)).upsert({
      create: {
        id: visitorId,
        createdAt: nowIso,
        updatedAt: nowIso,
        lastOnline: nowIso,
        countryOfOrigin: "NaN",
        correctAttempts: 0,
        incorrectAttempts: 0,
        isActive: true,
        role: "USER",
      },
      update: {
        updatedAt: nowIso,
        lastOnline: nowIso,
        isActive: true,
      }
    });

    const userCount = await db.orm.public.User
      .aggregate((agg) => ({ total: agg.count() }))
      .then(res => res.total);

    return NextResponse.json({ success: true, userCount });
  } catch (error: any) {
    console.error("Visitor Tracking failed:", error?.message, error?.stack);
    return NextResponse.json({ error: "Visitor tracking error" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { visitorId } = await request.json();

    if (!visitorId) {
      return NextResponse.json({ error: "No visitor ID available" }, { status: 400 });
    }

    const updatedUser = await db.orm.public.User
      .where((u) => u.id.eq(visitorId))
      .update(() => ({
        isActive: false,
      }));

      if(!updatedUser) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Failed to change user to offline:", error?.message, error?.stack);
    return NextResponse.json({ error: "Metric error" }, { status: 500 });
  }
}
