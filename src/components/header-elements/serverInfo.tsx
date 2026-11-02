import { Server } from "lucide-react";

interface Props {
  serverCountry: string;
}

export default function ServerInfo({ serverCountry }: Props) {
  return (
    <div className="flex items-center gap-3 px-4 py-1.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md shadow-sm">
      <div className="p-1.5 rounded-lg bg-cyan-950/60 text-cyan-400 border border-cyan-500/30 shadow-[0_0_8px_rgba(6,182,212,0.3)]">
        <Server size={16} />
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
          Active Node
        </span>
        <span className="text-xs font-bold font-mono text-zinc-100 tracking-wide">
          {serverCountry}
        </span>
      </div>
    </div>
  );
}