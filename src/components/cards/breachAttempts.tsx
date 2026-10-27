"use client";

import { ComposableMap, Geographies, Geography, Line } from "react-simple-maps";
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
  const breachCount = 1562;
  const growthPercentage = 3;

  return (
    <div className="w-full h-full bg-[#0d1520]/80 border border-[#1e2d3d] rounded-xl p-5 text-slate-200 font-sans backdrop-blur-md shadow-2xl">
      
      {/* Upper Data Header Grid Layout */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Breach Attempts
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              {breachCount.toLocaleString()}
            </span>
            <span className="flex items-center gap-0.5 text-xs font-semibold text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded">
              <ArrowUpRight size={12} className="stroke-3" />
              +{growthPercentage}% Hour
            </span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 block">
            Non-Real-Time Alerts
          </span>
        </div>
      </div>

      {/* Main Map Box & HUD Interface Container */}
      <div className="relative flex w-full h-full bg-[#070b12] border border-[#142130] rounded-lg overflow-hidden group">
        
        {/* Absolute Graphical Map Content Rendering */}
        <div className="absolute inset-0 flex items-center justify-center opacity-80">
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
            {/* 1. Global Geographies: Landmass Vector Graphics Layer */}
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#101a26"
                    stroke="#1c2d42"
                    strokeWidth={0.5}
                    className="w-full h-full outline-none"
                  />
                ))
              }
            </Geographies>

            {/* 2. Vector Threat Lines: Connecting Attack Coordinates Across Nodes */}
            {threatConnections.map((connection, i) => (
              <Line
                key={i}
                from={connection.from}
                to={connection.to}
                stroke="#f59e0b" // Amber / Orange visual pathing lines
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
        <div className="absolute bottom-[65%] left-[36%] flex flex-col items-center z-10">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b] animate-pulse" />
          <span className="text-[7px] font-mono text-amber-500/70 mt-1 uppercase">NA-EST</span>
        </div>

        {/* 4. Lower Cyber Metric Status Bar */}
        <div className="absolute bottom-2 left-2 z-10">
          <span className="inline-flex items-center gap-1.5 bg-red-950/80 border border-red-900/60 text-red-400 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-widest shadow-md">
            <span className="w-1 h-1 rounded-full bg-red-500 animate-ping" />
            Critical
          </span>
        </div>

      </div>
    </div>
  );
}
