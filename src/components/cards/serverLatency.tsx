"use client"

import { LatencyBadge } from "@/components/latencyBadge";
import LatencyGraph from '../latencyGraph';
import { useDashboardStore } from '@/app/(utils)/useMetricsStore';

interface Props {
  title?: string;
  data?: {
    pingMs?: number;
    [key: string]: any;
  };
}

export default function ServerLatencyCard({ title = "Server Latency", data }: Props) {
  const serverLatency = useDashboardStore((state) => state.serverLatency) ?? 0;
  const isOptimal = serverLatency < 120; 

  return (
    <div className="relative flex flex-col justify-between w-full h-full p-5 rounded-2xl bg-[#0d1520]/20 border-zinc-800/60 backdrop-blur-md shadow-xl text-slate-200">
      
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
            {title}
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-800/60 text-zinc-400 border border-zinc-700/40 uppercase tracking-widest">
          Live
        </span>
      </div>

      <div className="flex items-center gap-2.5 mb-3">
        <LatencyBadge ping={serverLatency} />
      </div>

      <div className="relative flex w-full h-44 bg-zinc-950/60 border border-zinc-800/40 rounded-xl overflow-hidden group mb-3 p-2 items-center justify-center">
        <LatencyGraph ping={serverLatency} />

        <div className="absolute bottom-2 left-2 z-10 pointer-events-none">
          <span className={`inline-flex items-center gap-1.5 border text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shadow-md backdrop-blur-md ${
            isOptimal 
              ? "bg-emerald-950/80 border-emerald-500/30 text-emerald-400" 
              : "bg-amber-950/80 border-amber-500/30 text-amber-400"
          }`}>
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isOptimal ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isOptimal ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
            </span>
            {isOptimal ? "Stable Connection" : "High Latency"}
          </span>
        </div>
      </div>

      {/* Symmetrical Telemetry Footer */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800/60 text-[11px]">
        <div className="bg-zinc-950/40 border border-zinc-800/60 rounded-lg px-3 py-1.5 flex flex-col">
          <span className="text-[10px] font-mono text-zinc-500 uppercase">Protocol</span>
          <span className="font-mono font-semibold text-zinc-200 mt-0.5">Secure TCP/WSS</span>
        </div>
        <div className="bg-zinc-950/40 border border-zinc-800/60 rounded-lg px-3 py-1.5 flex flex-col text-right">
          <span className="text-[10px] font-mono text-zinc-500 uppercase">Packet Loss</span>
          <span className="font-mono font-semibold text-emerald-400 mt-0.5">0.00% Nominal</span>
        </div>
      </div>

    </div>
  );
}