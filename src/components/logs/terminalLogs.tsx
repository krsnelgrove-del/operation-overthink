"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal, Trash2, Filter } from "lucide-react";

export interface LogEntry {
  id: string;
  timestamp: string;
  type: "log" | "error" | "warn" | "info";
  message: string;
}

interface TerminalLogsProps {
  logs: LogEntry[];
  onClear: () => void;
  className?: string;
}

export default function TerminalLogs({ logs, onClear, className = "" }: TerminalLogsProps) {
  const [filter, setFilter] = useState<string>("all");
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new logs
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const filteredLogs = logs.filter((log) => {
    if (filter === "all") return true;
    return log.type === filter;
  });

  const getBadgeColor = (type: LogEntry["type"]) => {
    switch (type) {
      case "error":
        return "text-red-400 bg-red-950/50 border-red-800/50";
      case "warn":
        return "text-yellow-400 bg-yellow-950/50 border-yellow-800/50";
      case "info":
        return "text-cyan-400 bg-cyan-950/50 border-cyan-800/50";
      default:
        return "text-green-400 bg-green-950/50 border-green-800/50";
    }
  };

  return (
    <div className={`flex flex-col rounded-xl border border-blue-500/30 bg-gray-950/90 shadow-2xl backdrop-blur-md overflow-hidden ${className}`}>
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-900/80 border-b border-blue-500/20">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="font-mono text-xs font-semibold text-gray-200 tracking-wider">
            SYSTEM_TELEMETRY // CONSOLE_LOGS
          </span>
        </div>

        <div className="flex items-center space-x-3">
          {/* Filter dropdown / buttons */}
          <div className="flex items-center space-x-1 bg-gray-950 rounded-lg p-1 border border-gray-800">
            {["all", "log", "warn", "error"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-2 py-0.5 text-[10px] font-mono uppercase rounded transition-colors ${
                  filter === type
                    ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Clear Logs */}
          <button
            onClick={onClear}
            title="Clear logs"
            className="p-1.5 text-gray-400 hover:text-red-400 bg-gray-950 hover:bg-red-950/30 rounded-lg border border-gray-800 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="flex-1 p-4 font-mono text-xs overflow-y-auto max-h-[350px] space-y-2 select-text">
        {filteredLogs.length === 0 ? (
          <div className="text-gray-600 italic text-center py-6">
            // No telemetry logs recorded yet...
          </div>
        ) : (
          filteredLogs.map((log) => (
            <div key={log.id} className="flex items-start space-x-3 leading-relaxed">
              <span className="text-gray-500 shrink-0 text-[10px] pt-0.5">
                {log.timestamp}
              </span>
              <span className={`px-1.5 py-0.5 text-[10px] uppercase rounded border font-bold shrink-0 ${getBadgeColor(log.type)}`}>
                {log.type}
              </span>
              <span className="text-gray-300 break-all whitespace-pre-wrap">
                {log.message}
              </span>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      {/* Terminal Footer status bar */}
      <div className="px-4 py-1.5 bg-gray-900/40 border-t border-gray-800/60 flex items-center justify-between text-[10px] font-mono text-gray-500">
        <span>STATUS: LIVE_MONITORING</span>
        <span>TOTAL_ENTRIES: {logs.length}</span>
      </div>
    </div>
  );
}