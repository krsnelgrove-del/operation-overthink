"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Activity, ShieldCheck, Globe, Clock, UserCheck } from "lucide-react";

interface ActiveUser {
  id: string;
  countryOfOrigin: string;
  correctAttempts: number;
  incorrectAttempts: number;
  isActive: boolean;
  lastOnline: string;
}

export default function LiveActivityStreamModal() {
  const [users, setUsers] = useState<ActiveUser[]>([]);
  const sortedUsers = [...users].sort((a, b) => {
  return (b.isActive === true ? 1 : 0) - (a.isActive === true ? 1 : 0);
});


  const [isLoading, setIsLoading] = useState(true);
  const [pollingOption, setPollingOption] = useState("5");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handlePollingOptionDropDown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSelectOption = (rate: string) => {
    setPollingOption(rate);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    async function getActiveUsers() {
      try {
        const res = await fetch("/api/users?returnType=getActiveUsers");
        const data = await res.json();
        if (data.usersOnline) {
          setUsers(data.usersOnline);
        }
      } catch (err) {
        console.error("Failed to fetch live activity stream:", err);
      } finally {
        setIsLoading(false);
      }
    }

    getActiveUsers();
    const interval = setInterval(getActiveUsers, Number(pollingOption) * 1000);
    return () => clearInterval(interval);
  }, [pollingOption]);
  

  return (
    <div className="flex flex-col h-full rounded-xl border border-cyan-500/30 bg-gray-950/80 shadow-2xl backdrop-blur-md overflow-hidden relative">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 bg-gray-900/80 border-b border-cyan-500/20">
        <div className="flex items-center space-x-2.5">
          <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
          <h2 className="font-mono text-sm font-bold text-gray-100 tracking-wider">
            LIVE USER ANALYTICS STREAM
          </h2>
        </div>

        <div className="flex items-center space-x-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
          </span>
          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
            {users.filter(u => u.isActive).length} Active Connections
          </span>
        </div>

      </div>

      {/* Body */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-xs">
        {isLoading ? (
          <div className="text-gray-500 text-center py-12 animate-pulse">
            Establishing secure link
          </div>
        ) : users.length === 0 ? (
          <div className="text-gray-600 text-center py-12 italic">
            No active operatives currently detected.
          </div>
        ) : (
          <AnimatePresence>
          {sortedUsers.map((user) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className={`flex items-center justify-between p-3 rounded-lg bg-gray-900/40 border transition-colors group ${
                user.isActive ? "border-white/5 hover:border-cyan-500/30" : "border-white/5 opacity-60"
              }`}
            >
              {/* User Status */}
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded border ${
                  user.isActive 
                    ? "bg-cyan-950/40 border-cyan-800/30 text-cyan-400" 
                    : "bg-gray-900 border-gray-800 text-gray-600"
                }`}>
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-gray-200 tracking-wider">
                      ID: {user.id.slice(0, 8)}...
                    </span>
                    <span className={`px-1.5 py-0.5 text-[9px] uppercase rounded border ${
                      user.isActive 
                        ? "bg-emerald-950/60 text-emerald-400 border-emerald-800/40" 
                        : "bg-gray-900 text-gray-500 border-gray-800"
                    }`}>
                      {user.isActive ? "ONLINE" : "OFFLINE"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 mt-1 text-[10px] text-gray-400">
                    <span className="flex items-center space-x-1">
                      <Globe className="w-3 h-3 text-gray-500" />
                      <span>Origin: {user.countryOfOrigin}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-gray-500" />
                      <span>Last Active: {new Date(user.lastOnline).toLocaleTimeString()}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="flex items-center space-x-2 text-[11px]">
                <div className="px-2.5 py-1 rounded bg-green-950/30 border border-green-800/30 text-green-400">
                  Correct: <span className="font-bold">{user.correctAttempts}</span>
                </div>
                <div className="px-2.5 py-1 rounded bg-red-950/30 border border-red-800/30 text-red-400">
                  Incorrect: <span className="font-bold">{user.incorrectAttempts}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        )}
      </div>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3 }}
          className="relative flex items-center justify-between p-3 rounded-lg bg-gray-900/40"
        >
          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-16 left-3 right-3 z-20 flex flex-col p-2 bg-gray-950 border border-cyan-500/40 rounded-lg shadow-2xl backdrop-blur-md space-y-1 font-mono text-xs"
            >
              <div className="px-2 py-1 text-[10px] text-cyan-400 border-b border-white/10 uppercase tracking-widest">
                Select Polling Frequency
              </div>
              {["0.5", "1", "5", "15"].map((rate) => (
                <button
                  key={rate}
                  onClick={() => handleSelectOption(rate)}
                  className={`flex items-center justify-between px-3 py-1.5 rounded transition-colors text-left ${
                    pollingOption === rate
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                      : "text-gray-300 hover:bg-gray-900 hover:text-white"
                  }`}
                >
                  <span>{rate}s Interval</span>
                  {pollingOption === rate && <span className="text-[10px] text-cyan-400">[ACTIVE]</span>}
                </button>
              ))}
            </motion.div>
          )}

          <div className="px-4 py-2 bg-gray-950/60 border-t flex items-center justify-between text-[10px] font-mono text-gray-500 hover:text-gray-300 border rounded-sm border-white/5 hover:border-cyan-500/30 transition-colors group w-full">
            <button 
            className="border-white w-full text-left flex items-center justify-between"
            onClick={handlePollingOptionDropDown}>
              <span>REFRESH_RATE: {pollingOption}s</span>
              <span 
                className="text-green-400 cursor-pointer hover:underline"
              >
                {isDropdownOpen ? "[CLOSE]" : "POLLING"}
              </span>
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}