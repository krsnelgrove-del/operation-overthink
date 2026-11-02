import { db } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function GET() {

  try {
    const resp = await db.orm.public.User.groupBy("countryOfOrigin").aggregate((agg) => ({
        count: agg.count()
    })).then(res => res).catch((error) => {
        console.error("Error fetching demographic metrics:", error);
        throw error;
    });

    const demographicAggregate = resp.map((itm) => ({
        origin: itm.countryOfOrigin ?? "NaN",
        count: itm.count ?? 0,
    }));

    return NextResponse.json({
        demographic: demographicAggregate,
        });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch metrics" }, { status: 500 });
    }
}