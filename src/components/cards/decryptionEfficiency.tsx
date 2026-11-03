"use client"

import { useDashboardStore } from '@/app/(utils)/useMetricsStore';

interface DecryptionEfficiencyProps {
  title?: string;
  data?: {
    rate?: number;
    [key: string]: any;
  };
}

export default function DecryptionEfficiencyCard({ title = "Decryption Efficiency", data }: DecryptionEfficiencyProps) {
  const correctAttempts = useDashboardStore((state) => state.correctAttempts) ?? 0;
  const incorrectAttempts = useDashboardStore((state) => state.incorrectAttempts) ?? 0;
  const totalAttempts = correctAttempts + incorrectAttempts;

  const efficiency = totalAttempts > 0 ? ((correctAttempts / totalAttempts) * 100).toFixed(2) : '0.00';
  const numericEfficiency = parseFloat(efficiency);
  const isOptimal = numericEfficiency >= 70;

  return (
    <div className="relative flex flex-col justify-between w-full h-full p-5 bg-[#0d1520]/20 text-slate-200">
      
      <div className="flex items-center justify-between w-full mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
            {title}
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-800/60 text-zinc-400 border border-zinc-700/40 uppercase tracking-widest">
          Live
        </span>
      </div>

      <div className="my-3">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-black text-white tracking-tight drop-shadow-[0_0_12px_rgba(56,189,248,0.2)]">
            {efficiency}%
          </span>
        </div>
        <p className="text-xs text-zinc-400 mt-1">
          Based on <span className="font-mono text-zinc-200 font-semibold">{totalAttempts}</span> total recorded attempts.
        </p>
      </div>

      <div className="flex items-center justify-between pt-3 mt-auto border-t border-zinc-800/60 text-[11px] font-medium text-zinc-400">
        <span className="flex items-center gap-1.5 text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Correct: <strong className="font-mono text-emerald-300">{correctAttempts}</strong>
        </span>
        <span className="flex items-center gap-1.5 text-red-400">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
          Failed: <strong className="font-mono text-red-300">{incorrectAttempts}</strong>
        </span>
      </div>

    </div>
  );
}