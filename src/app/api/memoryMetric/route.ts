import { NextResponse } from "next/server";

export async function GET() {
  const formatMB = (bytes?: number) =>
    bytes ? `${(bytes / 1024 / 1024).toFixed(2)}` : 0;

  try {
    // Get native Node.js server memory usage metrics
    const mem = process.memoryUsage();

    return NextResponse.json(
      {
        // heapUsed represents the memory actually being used by V8/JavaScript elements
        usage: formatMB(mem.heapUsed),
        // rss (Resident Set Size) represents total memory allocated to the whole process
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
