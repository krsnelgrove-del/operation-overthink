"use client";

import { LayoutDashboard, BarChart3, TerminalSquare } from "lucide-react";

interface NavigationBarProps {
  activeTab: string;
  onSelectTab: (name: string) => void;
  onToggleLogs: () => void;
  isLogsOpen: boolean;
}

export default function NavigationBar({ activeTab, onSelectTab, onToggleLogs, isLogsOpen}: NavigationBarProps) {
  const sideBarButtonStyleNormal = "aspect-square hover:border-b hover:border-white/20 hover:scale-104 transition-transform duration-200 flex flex-col items-center justify-center gap-1 p-2 rounded-xl text-zinc-300";
  const sideBarButtonStyleHighlighted = "aspect-square scale-104 border-t border-white/10 bg-linear-to-tl from-white/10 to-white/0 flex flex-col items-center justify-center gap-1 p-2 rounded-xl text-cyan-400 shadow-lg shadow-cyan-950/40";
  
  const navItems = [
    { name: "Overview", icon: LayoutDashboard, action: () => onSelectTab("Overview") },
    { name: "Analytics", icon: BarChart3, action: () => {onSelectTab("Analytics")} },
    { name: "Logs", icon: TerminalSquare, action: onToggleLogs }
  ];

  return (
    <div className="row-start-2 row-span-11 flex flex-col bg-linear-to-t from-cyan-500/30 to-blue-950/0 backdrop-blur-lg gap-2 p-1 overflow-hidden border-r border-white/10">
      {navItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = item.name === "Logs" ? isLogsOpen : activeTab === item.name;

        return (
          <button
            key={item.name}
            className={isActive ? sideBarButtonStyleHighlighted : sideBarButtonStyleNormal}
            onClick={item.action}
          >
            <IconComponent size={22} className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
            <span className="text-[10px] font-semibold tracking-wider uppercase">
              {item.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}