"use client"

import { useDashboardStore } from "@/app/(utils)/useMetricsStore";

// components/dataTracker.tsx
interface Props {
  title?: string;
  data?: {
    memoryUsage?: number;
    memoryMax?: number;
    [key: string]: any;
  };
}

export default function DataTrackerCard({ title, data }: Props) {
  const memoryUsage = useDashboardStore((state) => state.memoryUsage);
  const memoryMax = useDashboardStore((state) => state.memoryMax);


  return (
    <div className="p-4 text-white">
      <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
        {title}
      </h3>
      <div className="text-2xl font-bold mt-2">
        <h2>{memoryUsage} / {memoryMax}</h2>
      </div>
    </div>
  );
}