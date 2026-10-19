// components/serverLoad.tsx
import { useDashboardStore } from '@/app/(utils)/useMetricsStore';
import React from 'react';

// 1. Define the interface matching what Dashboard passes down
interface Props {
  title?: string;
  data?: {
    activeUsers?: number;
    [key: string]: any;
  };
}

// 2. Destructure title and data directly from the props parameter
export default function BreachAttemptsCard({ title, data }: Props) {
    const activeUsersCount = useDashboardStore((state) => state.activeUsers);

  return (
    <div className="p-4 text-white">
      <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
        {title}
      </h3>
      <div className="text-2xl font-bold mt-2">
        {activeUsersCount} users online
      </div>
    </div>
  );
}