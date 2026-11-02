import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface ChartDataItem {
  name: string;
  uv: number;
  fill?: string;
}

interface Props {
  title?: string;
  data: ChartDataItem[];
  maxCapacity?: number;
}

const RadialChart = ({ title = "Memory Usage", data }: Props) => {
  const usageItem = data.find(item => item.name === "Usage");
  const maxItem = data.find(item => item.name === "Max");
  const usageAmount = 100 / (usageItem?.uv ?? 0);
  const maxAmount = 100 / (maxItem?.uv ?? 100);
  
  const percentage = maxAmount > 0 ? Math.round((usageAmount / maxAmount) * 100) : 0;
  const isCritical = percentage > 98;

  // Calculate extra useful telemetry metrics
  const freeHeadroom = Math.max(0, Math.round(maxAmount - usageAmount));

  const chartData = [{
    ...usageItem,
    name: usageItem?.name || "Usage",
    uv: usageAmount,
  }];

  return (
    <div className="flex flex-col justify-between w-full h-full">
      
      {/* Upper Data Header Layout (Title and Live Badge Inline Flexed) */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
            {title}
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-800/60 text-zinc-400 border border-zinc-700/40 uppercase tracking-widest">
          Live
        </span>
      </div>

      {/* Primary Metric Value & Sub-tag */}
      <div className="flex items-center gap-2.5 mb-3">
        <span className={`text-3xl font-black tracking-tight ${isCritical ? "text-red-400 drop-shadow-[0_0_12px_rgba(248,113,113,0.4)]" : "text-white drop-shadow-[0_0_12px_rgba(56,189,248,0.3)]"}`}>
          {percentage}%
        </span>
        <span className="flex items-center gap-0.5 text-[11px] font-semibold text-sky-400 bg-sky-950/60 border border-sky-500/30 px-2 py-0.5 rounded-md shadow-sm">
          Allocated
        </span>
      </div>

      {/* Main Chart Box Container */}
      <div className="relative flex w-full h-44 bg-zinc-950/60 border border-zinc-800/40 rounded-xl overflow-hidden group mb-3">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="75%"
            innerRadius="75%" 
            outerRadius="100%"
            barSize={16}
            data={chartData}
            startAngle={180}
            endAngle={0}    
          >
            {/* SVG Gradients & Glow Filter */}
            <defs>
              <linearGradient id="optimalGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
              <linearGradient id="criticalGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f87171" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
              <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor={isCritical ? "#f87171" : "#38bdf8"} floodOpacity="0.6" />
              </filter>
            </defs>

            <PolarAngleAxis
              type="number"
              domain={[0, maxAmount]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar
              background={{ fill: '#18181b', stroke: '#27272a', strokeWidth: 1 }} 
              dataKey="uv"
              angleAxisId={0}
              cornerRadius={8} 
              forceCornerRadius={true}
              fill={isCritical ? "url(#criticalGradient)" : "url(#optimalGradient)"}
              filter="url(#neonGlow)"
              isAnimationActive={true}
              animationDuration={800}
            />
          </RadialBarChart>
        </ResponsiveContainer>

        {/* Center Label inside Gauge */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-none"
          style={{ top: '56%' }} 
        >
          <span className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400">
            Capacity
          </span>
        </div>

        {/* Lower Cyber Metric Status Bar */}
        <div className="absolute bottom-2 left-2 z-10">
          <span className={`inline-flex items-center gap-1.5 border text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shadow-md backdrop-blur-md ${
            isCritical 
              ? "bg-red-950/80 border-red-500/30 text-red-400" 
              : "bg-emerald-950/80 border-emerald-500/30 text-emerald-400"
          }`}>
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isCritical ? 'bg-red-400' : 'bg-emerald-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isCritical ? 'bg-red-500' : 'bg-emerald-500'}`}></span>
            </span>
            {isCritical ? "Critical Alert" : "Optimal System"}
          </span>
        </div>

      </div>

      {/* Useful Information Telemetry Footer */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800/60 text-[11px]">
        <div className="bg-zinc-950/40 border border-zinc-800/60 rounded-lg px-3 py-1.5 flex flex-col">
          <span className="text-[10px] font-mono text-zinc-500 uppercase">Headroom</span>
          <span className="font-mono font-semibold text-zinc-200 mt-0.5">{freeHeadroom} units free</span>
        </div>
        <div className="bg-zinc-950/40 border border-zinc-800/60 rounded-lg px-3 py-1.5 flex flex-col text-right">
          <span className="text-[10px] font-mono text-zinc-500 uppercase">Max Threshold</span>
          <span className="font-mono font-semibold text-zinc-200 mt-0.5">{Math.round(maxAmount)} units</span>
        </div>
      </div>

    </div>
  );
};

export default RadialChart;