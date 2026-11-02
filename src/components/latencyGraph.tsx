"use client";

import React, { useState, useEffect } from "react";
import { ResponsiveContainer, LineChart, Line, YAxis, Tooltip } from "recharts";
import { LatencyDataPoint } from "@/app/dashboard/(config)/dashboardCards";

const MAX_DATA_POINTS = 30; // Displays the last 30 seconds

export default function LatencyGraph({ ping }: { ping: number | null }) {
  const [data, setData] = useState<LatencyDataPoint[]>([]);

  useEffect(() => {
    if(ping === null)
      return;

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      setData((prevData) => {
        const updated = [...prevData, { time: timeStr, latency:  ping ?? 0}];
        // Keep only the last N data points
        if (updated.length > MAX_DATA_POINTS) {
          return updated.slice(updated.length - MAX_DATA_POINTS);
        }
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [ping]);

  return (
    <div className="w-full h-full min-h-45 p-4 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
          Real-Time Latency (ms)
        </span>
        <span className="text-sm font-mono font-bold text-cyan-400">
          {data.length > 0 ? `${data[data.length - 1].latency} ms` : "--"}
        </span>
      </div>

      <div className="w-full h-32">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <YAxis domain={[0, 150]} hide={true} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(8, 13, 20, 0.9)",
                borderColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                fontSize: "12px",
                fontFamily: "monospace",
              }}
              itemStyle={{ color: "#00D2FF" }}
            />
            <Line
              type="monotone"
              dataKey="latency"
              stroke="#00D2FF"
              strokeWidth={2}
              dot={true}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}