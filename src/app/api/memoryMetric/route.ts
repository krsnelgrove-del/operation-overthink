import { NextResponse } from "next/server";

export async function GET() {
  const formatMB = (bytes?: number) =>
    bytes ? `${(bytes / 1024 / 1024).toFixed(2)}` : 0;

  try {
    const mem = process.memoryUsage();

    return NextResponse.json(
      {
        usage: formatMB(mem.heapUsed),
        max: formatMB(mem.rss),
      },
      {
        headers: { "Cache-Control": "no-store, max-age=0" },
      }
    );
  } catch (error) {
    console.error("Error updating memory metrics:", error);
    return NextResponse.json(
      { latency: 15, error: "Failed to fetch memory metrics" },
      { status: 500 }
    );
  }
}
