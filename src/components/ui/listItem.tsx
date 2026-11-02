interface Props {
    data: {
                id: string,
                countryOfOrigin: string,
                correctAttempts: number,
                incorrectAttempts: number,
                isActive: boolean,
                role: string,
                createdAt: Date,
                updatedAt: Date,
                lastOnline: Date,
    }
}

const badgeVariants = {
  online: "bg-green-700 border-green-900 text-strong text-xs font-medium px-1.5 py-0.5",
  offline: "bg-red-500 text-red-700 ring-red-600/10",
  neutral: "bg-gray-500 text-gray-600 ring-gray-500/10",
};

export default function ListItem({data}: Props) {
return (
<div className="flex flex-wrap sm:flex-nowrap items-center justify-between w-full gap-3 px-4 py-3 rounded-xl bg-black/20 hover:bg-black/30 border border-[#1e2d3d] transition-all duration-200 backdrop-blur-md text-slate-200">
    
    <div className="flex items-center gap-2 min-w-0">
        <span className="text-xs font-mono text-slate-300 bg-slate-900/60 px-2.5 py-1 rounded-md border border-slate-800 tracking-tight truncate">
            {data.id.substring(0, 6)}...{data.id.substring(data.id.length - 4)}
        </span>
    </div>

    <div className="flex flex-col text-xs text-slate-400 font-medium tracking-wide truncate">
        <span className="text-slate-600 mr-1.5 hidden md:inline">Last Activity:</span>
        <span>{data.lastOnline ? new Date(data.lastOnline).toLocaleString() : "Never"}</span>
        
    </div>

    <div className="flex items-center shrink-0 ml-auto sm:ml-0">
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-medium tracking-wide rounded-full border shadow-sm transition-all duration-300 ${
            data.isActive 
                ? "bg-emerald-950/60 text-emerald-400 border-emerald-500/30 shadow-emerald-950/50" 
                : "bg-zinc-950/80 text-zinc-400 border-zinc-800 shadow-black/20"
        }`}>
            <span className="relative flex h-2 w-2">
                {data.isActive && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                )}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${data.isActive ? 'bg-emerald-500' : 'bg-zinc-600'}`}></span>
            </span>
            <span>{data.isActive ? "Online" : "Offline"}</span>
        </div>
    </div>
</div>
)
}