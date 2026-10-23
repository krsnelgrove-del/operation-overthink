"use client"

import React from 'react';
import { LatencyBadge } from "@/components/latencyBadge";
import LatencyGraph from '../latencyGraph';
import { useDashboardStore } from '@/app/(utils)/useMetricsStore';

// 1. Define the interface matching what Dashboard passes down
interface Props {
  title?: string;
  data?: {
    pingMs?: number;
    [key: string]: any;
  };
}

// 2. Destructure title and data directly from the props parameter
export default function ServerLatencyCard({ title, data }: Props) {
const serverLatency = useDashboardStore((state) => state.serverLatency);

  return (
    <div className="p-4 text-white">
      <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
        {title}
      </h3>
      <div className="text-2xl font-bold mt-2">
        <LatencyBadge ping={serverLatency} />
        <LatencyGraph ping={serverLatency} />
      </div>
    </div>
  );
}