"use client";

import { useState, useEffect, useCallback } from "react";
import { LogEntry } from "@/components/logs/terminalLogs";

export function useConsoleLogs(maxLogs = 100) {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const addLog = useCallback((type: LogEntry["type"], args: any[]) => {
    const message = args
      .map((arg) => (typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)))
      .join(" ");

    const newEntry: LogEntry = {
      id: crypto.randomUUID(),
      timestamp: new Date().toLocaleTimeString(),
      type,
      message,
    };

    setLogs((prev) => [...prev.slice(-maxLogs), newEntry]);
  }, [maxLogs]);

  useEffect(() => {
    // Save original console methods
    const origLog = console.log;
    const origError = console.error;
    const origWarn = console.warn;
    const origInfo = console.info;

    console.log = (...args) => {
      origLog(...args);
      addLog("log", args);
    };

    console.error = (...args) => {
      origError(...args);
      addLog("error", args);
    };

    console.warn = (...args) => {
      origWarn(...args);
      addLog("warn", args);
    };

    console.info = (...args) => {
      origInfo(...args);
      addLog("info", args);
    };

    // Capture uncaught window exceptions
    const handleWindowError = (event: ErrorEvent) => {
      addLog("error", [event.message || "Uncaught Exception"]);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      addLog("error", [`Unhandled Rejection: ${event.reason}`]);
    };

    window.addEventListener("error", handleWindowError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      console.log = origLog;
      console.error = origError;
      console.warn = origWarn;
      console.info = origInfo;
      window.removeEventListener("error", handleWindowError);
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
    };
  }, [addLog]);

  const clearLogs = () => setLogs([]);

  return { logs, clearLogs };
}