import React from "react";
import { useDashboardStore } from "@/app/(utils)/useMetricsStore";


export function LatencyBadge({ ping }: { ping: number | null }) {

  const getStatusColor = () => {
    if(ping != null) {
    if (ping < 50) return "bg-emerald-500 text-emerald-400";
    if (ping < 150) return "bg-amber-500 text-amber-400";
    }
    return "bg-rose-500 text-rose-400";
  };

  const statusColor = getStatusColor();

  return (
    <div className="inline-flex items-center gap-2 rounded-md bg-zinc-900 px-3 py-1.5 border border-white/10 text-xs font-mono">
      <span className="relative flex h-2 w-2">
        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${statusColor.split(" ")[0]}`} />
        <span className={`relative inline-flex h-2 w-2 rounded-full ${statusColor.split(" ")[0]}`} />
      </span>
      <span className="text-zinc-400">Network:</span>
      <span className={`font-semibold ${statusColor.split(" ")[1]}`}>{ping ?? "--"}ms</span>
    </div>
  );
}