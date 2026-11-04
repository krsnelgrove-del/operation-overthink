"use client"

import { useDashboardStore } from "@/app/(utils)/useMetricsStore";
import RadialChart from "../ui/radialChart";

interface Props {
  title?: string;
  data?: {
    memoryUsage?: number;
    memoryMax?: number;
    [key: string]: any;
  };
}

export default function DataTrackerCard({ title = "Memory Usage", data }: Props) {
  const memoryUsage = useDashboardStore((state) => state.memoryUsage);
  const memoryMax = useDashboardStore((state) => state.memoryMax);

  const plotData = [
    { name: "Usage", uv: memoryUsage ?? 0 },
    { name: "Max", uv: memoryMax ?? 100 }
  ];

  return (
    <div className="relative flex flex-col justify-between w-full h-full p-5 rounded-2xl bg-[#0d1520]/20">
      <RadialChart title={title} data={plotData} />
    </div>
  );
}