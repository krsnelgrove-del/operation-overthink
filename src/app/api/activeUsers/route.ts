import { NextResponse } from "next/server";
import { db } from "@/prisma/db";
import { NetworkResources } from "node:inspector/promises";
import { error } from "node:console";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const activeUsers = await db.orm.public.User
      .where({ isActive: true })
      .all();

    const activeCount = activeUsers.length;

    return NextResponse.json(
      {
        activeUsers: activeCount,
      },
      {
        headers: { "Cache-Control": "no-store, max-age=0" },
      }
    );
  } catch (error) {
    console.error("Error fetching active visitor metrics:", error);
    return NextResponse.json(
      { activeUsers: 0, error: "Failed to fetch visitor metrics" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
    try {
        const { visitorId } = await request.json();

        if(!visitorId) {
        return NextResponse.json({ error: "Missing visiter ID"}, { status: 401 })
        }

        const user = await db.orm.public.User.upsert({
            create: {
                id: visitorId,
                isActive: true,
                role: "USER",
            },
            update: {
                isActive: true,
            }
        });

        return NextResponse.json({ success: true, userId: user.id});
    }
    catch (error){
        console.error("Visitor Tracking failed:", error);
        return NextResponse.json({error: "Visitor tracking error: "}, { status: 500 });
    }
}

export async function PUT(request: Request) {
try {
  const { visitorId } = await request.json();

  if(!visitorId) {
    return NextResponse.json({ error: "No visitor ID available" }, { status: 400 })
  }

  await db.orm.public.User.where({ id: visitorId }).update({
    isActive: false,
  })
  return NextResponse.json({ success: true});
}
catch {
  console.error("Failed to change user to offline", error);
  return NextResponse.json({error: "Metric error" }, { status: 500 });
}
}