"use client";

import { ComposableMap, Geographies, Geography, Line } from "react-simple-maps";
import { useDashboardStore } from "@/app/(utils)/useMetricsStore";
import { ArrowUpRight } from "lucide-react";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

type Coordinate = [number, number];

const threatConnections: { from: Coordinate; to: Coordinate }[] = [
  { from: [-74.006, 40.7128], to: [37.6173, 55.7558] },   // NYC to Moscow
  { from: [-74.006, 40.7128], to: [116.4074, 39.9042] }, // NYC to Beijing
  { from: [-74.006, 40.7128], to: [126.978, 37.5665] }, // NYC to Seoul
  { from: [-74.006, 40.7128], to: [-43.1729, -22.9068] }, // NYC to Rio
] as const;

export default function BreachAttemptsCard() {
  const breachCount = useDashboardStore((state) => state.visitCount);
  const growthPercentage = 3;

  return (
    <div className="relative flex flex-col justify-between w-full h-full p-5 rounded-2xl bg-zinc-900/40 hover:bg-zinc-900/70 border border-zinc-800/60 hover:border-zinc-700/80 transition-all duration-300 backdrop-blur-md shadow-xl text-slate-200">
      
      {/* Upper Data Header Layout (Title and (Non)-Real-Time Badge Inline Flexed) */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
            Breach Attempts
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-950/40 text-amber-400 border border-amber-500/30 uppercase tracking-widest">
          (Non)-Real-Time
        </span>
      </div>

      {/* Primary Metric Value & Growth Sub-tag */}
      <div className="flex items-center gap-2.5 mb-3">
        <span className="text-3xl font-black text-white tracking-tight drop-shadow-[0_0_12px_rgba(245,158,11,0.3)]">
          {breachCount}
        </span>
        <span className="flex items-center gap-0.5 text-[11px] font-semibold text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded-md shadow-sm">
          <ArrowUpRight size={12} className="stroke-[2.5]" />
          +{growthPercentage}% Hour
        </span>
      </div>

      {/* Main Map Box Container (h-44 height matching RadialChart) */}
      <div className="relative flex w-full h-44 bg-zinc-950/60 border border-zinc-800/40 rounded-xl overflow-hidden group mb-3">
        
        <div className="absolute inset-0 flex items-center justify-center opacity-85">
          <ComposableMap
            projection="geoNaturalEarth1"
            projectionConfig={{
              scale: 150,
              center: [-50, 20]
            }}
            width={400}
            height={200}
            className="w-full h-full"
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#18181b"
                    stroke="#27272a"
                    strokeWidth={0.5}
                    className="w-full h-full outline-none"
                  />
                ))
              }
            </Geographies>

            {/* Vector Threat Lines */}
            {threatConnections.map((connection, i) => (
              <Line
                key={i}
                from={connection.from}
                to={connection.to}
                stroke="#f59e0b"
                strokeWidth={1.5}
                strokeLinecap="round"
                className="animate-pulse"
                style={{
                  strokeDasharray: "4, 4",
                }}
              />
            ))}
          </ComposableMap>
        </div>

        {/* Subsidiary Target Node Pin Location */}
        <div className="absolute bottom-[65%] left-[36%] flex flex-col items-center z-10 pointer-events-none">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b] animate-pulse" />
          <span className="text-[7px] font-mono text-amber-400/80 mt-1 uppercase tracking-widest bg-zinc-950/80 px-1 rounded border border-amber-500/20">NA-EST</span>
        </div>

        {/* Lower Cyber Metric Status Bar */}
        <div className="absolute bottom-2 left-2 z-10">
          <span className="inline-flex items-center gap-1.5 bg-red-950/80 border border-red-500/30 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shadow-md backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            Critical Alert
          </span>
        </div>

      </div>

      {/* Symmetrical Telemetry Footer */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800/60 text-[11px]">
        <div className="bg-zinc-950/40 border border-zinc-800/60 rounded-lg px-3 py-1.5 flex flex-col">
          <span className="text-[10px] font-mono text-zinc-500 uppercase">Primary Zone</span>
          <span className="font-mono font-semibold text-amber-400 mt-0.5">NA-EST Node</span>
        </div>
        <div className="bg-zinc-950/40 border border-zinc-800/60 rounded-lg px-3 py-1.5 flex flex-col text-right">
          <span className="text-[10px] font-mono text-zinc-500 uppercase">Active Vectors</span>
          <span className="font-mono font-semibold text-zinc-200 mt-0.5">4 Nodes Linked</span>
        </div>
      </div>

    </div>
  );
}