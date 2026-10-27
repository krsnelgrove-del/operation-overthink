import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface ChartDataItem {
  name: string;
  uv: number;
  fill?: string;
}

interface Props {
  data: ChartDataItem[];
  maxCapacity?: number;
}

const RadialChart = ({ data }: Props) => {

    const usageItem = data.find(item => item.name === "Usage");
  const maxItem = data.find(item => item.name === "Max");
  const usageAmount = 100 / (usageItem?.uv ?? 0);
  const maxAmount = 100 / (maxItem?.uv ?? 100);
  
  const percentage = maxAmount > 0 ? Math.round((usageAmount / maxAmount) * 100) : 0;
    // const clampedUsageValue = Math.min(usageAmount, maxAmount);

  const chartData = [{
    ...usageItem,
    name: usageItem?.name || "Usage",
    uv: usageAmount,
    fill: usageItem?.fill || (percentage > 98 ? "rgba(232, 84, 84, 1)" : "rgba(60, 196, 225, 1)")
  }];

  return (
    <div className="relative w-full max-w-100 mx-auto\">
      <ResponsiveContainer width="100%" aspect={1.5}>
        <RadialBarChart
          cx="50%"
          cy="70%"
          innerRadius="75%" 
          outerRadius="100%"
          barSize={20}
          data={chartData}
          startAngle={180}
          endAngle={0}    
        >
          <PolarAngleAxis
            type="number"
            domain={[0, maxAmount]}
            angleAxisId={0}
            tick={false}
            
          />
          <RadialBar
            background={{ fill: '#27272a' }} 
            dataKey="uv"
            angleAxisId={0}
            cornerRadius={2} 
            forceCornerRadius={false} 
          />
        </RadialBarChart>
      </ResponsiveContainer>

      <div 
        className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-none"
        style={{ top: '48%' }} 
      >
        <span className={percentage > 98 ? "block text-4xl font-extrabold text-red-400 tracking-tight" : "block text-4xl font-extrabold text-white tracking-tight"}>
          {percentage}%
        </span>
        <span className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 mt-1">
          Memory Usage
        </span>
      </div>
    </div>
  );
};

export default RadialChart;
