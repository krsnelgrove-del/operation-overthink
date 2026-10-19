import { useDashboardStore } from '@/app/(utils)/useMetricsStore';
import React from 'react';

interface DecryptionEfficiencyProps {
  title?: string;
  data?: {
    rate?: number;
    [key: string]: any;
  };
}

export default function DecryptionEfficiencyCard({ title, data }: DecryptionEfficiencyProps) {
const correctAttempts = useDashboardStore((state) => state.correctAttempts);
const incorrectAttempts = useDashboardStore((state) => state.incorrectAttempts);
const totalAttempts = ((correctAttempts ?? 0) + (incorrectAttempts ?? 0));

  return (
    <div className="p-4 text-white">
      <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
        {title}
      </h3>
      <div className="text-2xl font-bold mt-2">
        {totalAttempts !== null ? ((correctAttempts || 0) / totalAttempts * 100).toFixed(2) : '0.00'}%
      </div>
    </div>
  );
}