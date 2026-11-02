import Link from "next/link";
import ServerInfo from "../header-elements/serverInfo";
import { LogOut, Cpu } from "lucide-react";

interface Props {
  serverCountry: string;
}

export default function Header({ serverCountry }: Props) {
  return (
    <div className="col-span-12 row-span-1 grid grid-cols-12 items-center px-6 bg-linear-to-l from-cyan-500/10 to-cyan-950/10 backdrop-blur-lg gap-2z-20">
      
      {/* Brand / Logo Section */}
      <div className="flex items-center justify-center gap-2 col-span-2 border-r border-white/20 pr-4 text-white font-bold tracking-wider">
        <Cpu size={28} className="text-cyan-400 drop-shadow-[0_0_12px_rgba(6,182,212,0.5)] shrink-0" />
        <span className="text-xl font-black tracking-wider text-white">NEXUS</span>
      </div>

      {/* Title / Description */}
      <div className="col-span-3 pl-4 text-white font-medium text-xl">
        <h1>Dashboard</h1>
      </div>

      {/* Status Badge */}
      <div className="col-span-2 text-white text-sm p-2 border border-white/20 rounded-md bg-linear-to-tl from-white/30 to-white/0 backdrop-blur-sm shadow-sm shadow-cyan-500/20">
        <h3>Status: <span className="text-green-400 font-bold">ONLINE</span></h3>
      </div>

      {/* Server Info Component */}
      <div className="col-span-3 flex justify-center">
        <ServerInfo serverCountry={serverCountry} />
      </div>

      {/* Logout Action */}
      <div className="col-span-2 flex justify-end">
        <Link 
          href="../home" 
          className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-950/80 border border-red-500/30 text-red-400 text-xs font-semibold tracking-wide transition-all duration-200 shadow-sm"
        >
          <LogOut size={14} className="transition-transform group-hover:-translate-x-0.5" />
          <span>Logout</span>
        </Link>
      </div>

    </div>
  );
}