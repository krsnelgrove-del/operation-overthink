"use client"

import { useDashboardStore } from '@/app/(utils)/useMetricsStore';
import { useEffect, useState } from 'react';
interface Props {
  title?: string;
  data?: {
    totalAttempts?: number;
    status?: string;
    [key: string]: any;
  };
}

export default function BreachAttemptsCard({ title, data }: Props) {  
    const breachAttempts = useDashboardStore((state) => state.visitCount);
    const countDisplay =
    typeof breachAttempts === "object" && breachAttempts !== null
      ? (breachAttempts as any).count
      : breachAttempts;

  return (
    <div className="p-4 text-white">
      <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
        {title}
      </h3>
      <div className="text-2xl font-bold mt-2">
        <h2>{countDisplay ?? "1562"}</h2>
        <p>{data?.status}</p>
      </div>
    </div>
  );
}