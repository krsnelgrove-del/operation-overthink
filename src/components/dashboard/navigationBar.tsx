"use client";

import Link from "next/link";
import { LayoutDashboard, BarChart3, TerminalSquare } from "lucide-react";

interface Props {
  pathName: string;
}

export default function NavigationBar({ pathName }: Props) {
  const sideBarButtonStyleNormal: string = "aspect-square hover:border-b hover:border-white/20 hover:scale-104 transition-transform duration-200 flex flex-col items-center justify-center gap-1 p-2 rounded-xl text-zinc-300";
  const sideBarButtonStyleHighlighted: string = "aspect-square scale-104 border-t border-white/10 bg-linear-to-tl from-white/10 to-white/0 flex flex-col items-center justify-center gap-1 p-2 rounded-xl text-cyan-400 shadow-lg shadow-cyan-950/40";
  
  const navLinks = [
    { name: "Overview", href: "../overview", icon: LayoutDashboard },
    { name: "Analytics", href: "../dashboard", icon: BarChart3 },
    { name: "Logs", href: "../logs", icon: TerminalSquare }
  ];

  return (
    <div className="row-start-2 row-span-11 flex flex-col bg-linear-to-t from-cyan-500/30 to-blue-950/0 backdrop-blur-lg gap-2 p-1 overflow-hidden border-r border-white/10">
      {navLinks.map((link) => {
        const IconComponent = link.icon;
        const isPath = pathName === link.href.substring(2, link.href.length);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={isPath ? sideBarButtonStyleHighlighted : sideBarButtonStyleNormal}
          >
            <IconComponent size={22} className={isPath ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" : "text-zinc-400"} />
            <span className="text-[10px] font-semibold tracking-wider uppercase">
              {link.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}