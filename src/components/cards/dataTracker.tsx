"use client"

import { useDashboardStore } from "@/app/(utils)/useMetricsStore";
import RadialChart from "../ui/radialChart";

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

  const plotData = [{
    name: "Usage",
    uv: memoryUsage ?? 0,
  },
{
  name: "Max",
  uv: memoryMax ?? 100,
}]

  return (
    <div className="w-full h-full p-4 text-white bg-[#0d1520]/80">
      <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-wider ">
        {title}
      </h3>
      <div>
        <RadialChart data={plotData} />
      </div>
    </div>
  );
}