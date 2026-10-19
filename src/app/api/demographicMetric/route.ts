import { db } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function GET() {

  try {
    const resp = await db.orm.public.User.groupBy("countryOfOrigin").aggregate((value) => ({
        count: value.count()
    }))
    console.log("RESPONSE FROM DEMOGRAPHICMETRIC ROUTE: ", resp);

    const demographicAggregate = resp.map((itm) => ({
        origin: itm.countryOfOrigin ?? "NaN",
        count: itm.count,
    }));

    return NextResponse.json({
        demographic: demographicAggregate,
        });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch metrics" }, { status: 500 });
    }
}