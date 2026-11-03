"use client";

import { useConsoleLogs } from "@/hooks/useConsoleLogs";
import TerminalLogs from "@/components/logs/terminalLogs";

export default function TerminalLogModal() {
  const { logs, clearLogs } = useConsoleLogs();

  return (
      <TerminalLogs logs={logs} onClear={clearLogs} className="w-full max-w-4xl" />
  );
}