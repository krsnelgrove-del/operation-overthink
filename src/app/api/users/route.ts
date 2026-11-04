import { NextRequest, NextResponse } from "next/server";
import { db } from "@/prisma/db";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const returnType = searchParams.get("returnType");

    if (returnType === "getActiveUsers") {
      const allUsers = await db.orm.public.User.all();
      const thresholdTime = Date.now() - 45000;

      return NextResponse.json({
        usersOnline: allUsers.map((user) => {
          const isRecent = user.lastOnline ? new Date(user.lastOnline).getTime() >= thresholdTime : false;
          const isOnline = user.isActive && isRecent;

          return {
            id: user.id,
            countryOfOrigin: user.countryOfOrigin ?? "UNKNOWN",
            correctAttempts: user.correctAttempts,
            incorrectAttempts: user.incorrectAttempts,
            isActive: isOnline,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            lastOnline: user.lastOnline,
          };
        }),
      });
    }

    if (returnType === "userCount") {
      const userCount = await db.orm.public.User.aggregate((agg) => ({ total: agg.count() })).then(res => res.total);
      return NextResponse.json({ visitCount: userCount });
    }

    return NextResponse.json({ error: "Invalid returnType parameter" }, { status: 400 });
  } catch (error) {
    console.error("Error fetching active visitor metrics:", error);
    return NextResponse.json(
      { activeUsers: 0, error: "Failed to fetch visitor metrics" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  console.log(">>> POST /api/users HIT");
  try {
    const body = await request.json();

    if (!body) {
      return NextResponse.json({ error: "Missing request body" }, { status: 400 });
    }

    const visitorId = body.visitorId;

    if (!visitorId) {
      return NextResponse.json({ error: "Missing visitor ID" }, { status: 401 });
    }

    const nowIso = new Date().toISOString();
    const detectedCountry = await getCountryFromRequest(request);

    await db.orm.public.User.where((u) => u.id.eq(visitorId)).upsert({
      create: {
        id: visitorId,
        createdAt: nowIso,
        updatedAt: nowIso,
        lastOnline: nowIso,
        countryOfOrigin: detectedCountry,
        correctAttempts: 0,
        incorrectAttempts: 0,
        isActive: true,
        role: "USER",
      },
      update: {
        updatedAt: nowIso,
        lastOnline: nowIso,
        isActive: true,
        countryOfOrigin: detectedCountry,
      },
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

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const visitorId = body.visitorId;
    const status = body.isOnline;

    if (!visitorId) {
      return NextResponse.json({ error: "No visitor ID available" }, { status: 400 });
    }

    const nowIso = new Date().toISOString();
    const isActiveVal = typeof status === "string" ? status === "true" : Boolean(status);
    const detectedCountry = await getCountryFromRequest(request);

    await db.orm.public.User.where((u) => u.id.eq(visitorId)).upsert({
      create: {
        id: visitorId,
        createdAt: nowIso,
        updatedAt: nowIso,
        lastOnline: nowIso,
        countryOfOrigin: detectedCountry,
        correctAttempts: 0,
        incorrectAttempts: 0,
        isActive: isActiveVal,
        role: "USER",
      },
      update: {
        updatedAt: nowIso,
        lastOnline: nowIso,
        isActive: isActiveVal,
        countryOfOrigin: detectedCountry,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Failed to change user status:", error?.message, error?.stack);
    return NextResponse.json({ error: "Metric error" }, { status: 500 });
  }
}

// Helpers

async function getCountryFromRequest(request: NextRequest): Promise<string> {
  // 1. Check Netlify Edge Headers
  const netlifyCountry = request.headers.get("x-country");
  if (netlifyCountry && netlifyCountry !== "XX") {
    return netlifyCountry.toUpperCase();
  }

  const ip = 
    request.headers.get("x-nf-client-connection-ip") ||
    request.headers.get("client-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip");

  if (ip && ip !== "127.0.0.1" && ip !== "::1") {
    try {
      const geoRes = await fetch(`https://ipapi.co/${ip}/country/`, { cache: "no-store" });
      if (geoRes.ok) {
        const country = await geoRes.text();
        if (country && country.trim().length === 2) return country.trim().toUpperCase();
      }
    } catch (e) {
      console.warn("IP Geolocation lookup failed:", e);
    }
  }

  return "US";
}