"use client"

import React from 'react';
import { useDashboardStore } from '@/app/(utils)/useMetricsStore';
import { Globe, Users } from 'lucide-react';

interface Props {
  title?: string;
  data?: any[];
}

export default function DemographicMap({ title = "Demographic Map" }: Props) {
  const demographicMapAggregate = useDashboardStore((state) => state.demographic) ?? [];
  
  // Calculate total regional users
  const totalUsers = demographicMapAggregate.reduce((acc, curr) => acc + (curr.count ?? 0), 0);

  return (
    <div className="relative flex flex-col justify-between w-full h-full p-5 rounded-2xl bg-[#0d1520]/20 text-slate-200">
      
      {/* Upper Data Header Layout (Title and Badge Inline Flexed) */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
            {title}
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-800/60 text-zinc-400 border border-zinc-700/40 uppercase tracking-widest">
          Telemetry
        </span>
      </div>

      {/* Primary Metric Value / Origins Sub-tag */}
      <div className="flex items-center gap-2.5 mb-3">
        <span className="text-3xl font-black text-white tracking-tight drop-shadow-[0_0_12px_rgba(56,189,248,0.3)]">
          {totalUsers}
        </span>
        <span className="flex items-center gap-1 text-[11px] font-semibold text-sky-400 bg-sky-950/60 border border-sky-500/30 px-2 py-0.5 rounded-md shadow-sm">
          <Users size={12} className="stroke-[2.5]" />
          Origins
        </span>
      </div>

      {/* Main Content Box Container */}
      <div className="relative flex flex-col w-full h-48 bg-zinc-950/60 border border-zinc-800/40 rounded-xl overflow-hidden p-3 group">
        
        {/* Scrollable list area with bottom fade-out mask */}
        <div className="relative flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar mask-[linear-gradient(to_bottom,black_80%,transparent_100%)]">
          {demographicMapAggregate.length > 0 ? (
            demographicMapAggregate.map((value, index) => {
              const origin = value.origin ?? "Unknown Region";
              const count = value.count ?? 0;
              const percentage = totalUsers > 0 ? Math.round((count / totalUsers) * 100) : 0;

              return (
                <div 
                  key={value.origin ?? index} 
                  className="flex items-center justify-between px-3 py-2 rounded-lg bg-zinc-900/60 border border-zinc-800/60 text-xs font-mono"
                >
                  <div className="flex items-center gap-2 truncate">
                    <Globe size={13} className="text-sky-400 shrink-0" />
                    <span className="text-zinc-200 font-medium truncate">{origin}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-zinc-400 text-[10px]">{percentage}%</span>
                    <span className="px-2 py-0.5 rounded bg-zinc-800 text-sky-300 font-bold border border-zinc-700/50">
                      {count}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex items-center justify-center h-full text-xs text-zinc-500 font-mono">
              No demographic telemetry logged.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}