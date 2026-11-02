"use client"
import ListItem from '../ui/listItem';
import { useDashboardStore } from '@/app/(utils)/useMetricsStore';

// 1. Define the interface matching what Dashboard passes down
interface Props {
  title?: string;
  data?: {
    activeUsers?: {
                id: string,
                countryOfOrigin: string,
                correctAttempts: number,
                incorrectAttempts: number,
                isActive: boolean,
                role: string,
                createdAt: Date,
                updatedAt: Date,
                lastOnline: Date,
    }[];
    [key: string]: any;
  };
}

// 2. Destructure title and data directly from the props parameter
export default function BreachAttemptsCard({ title = "Active Sessions", data }: Props) {
  const activeUsers = useDashboardStore((state) => state.activeUsers);

  return (
    <div className="relative flex flex-col w-full h-full p-5 rounded-2xl bg-[#0d1520]/20  text-slate-200">
      
      <div className="flex items-center justify-between mb-3 shrink-0">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
          {title}
        </h3>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-800/60 text-zinc-400 border border-zinc-700/40 uppercase tracking-widest">
          {activeUsers?.length || 0} Online
        </span>
      </div>

      {/* Scrollable Container with Bottom Fade-Out Mask */}
      <div 
        className="relative overflow-y-auto h-full space-y-2 pr-1 custom-scrollbar mask-[linear-gradient(to_bottom,black_80%,transparent_100%)]"
      >
        {activeUsers && activeUsers.length > 0 ? (
          activeUsers.map((userInfo) => (
            <ListItem key={userInfo.id} data={userInfo} />
          ))
        ) : (
          <div className="text-xs text-zinc-500 text-center py-6 font-mono">
            No active users
          </div>
        )}
      </div>
    </div>
  );
}