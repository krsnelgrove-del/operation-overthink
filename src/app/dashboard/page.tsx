"use client"

import "../globals.css";
import Header from "@/components/dashboard/header";
import NavigationBar from "@/components/dashboard/navigationBar";
import Content from "@/components/dashboard/content";
import TerminalLogModal from "@/components/modals/TerminalLogModal";

import { useEffect, useState } from "react";
import { useDashboardStore } from "../(utils)/useMetricsStore";
import { AnimatePresence, motion } from "motion/react";

export default function Dashboard() {
    const [serverCountry, setServerCountry] = useState<string>("Loading...");
    const serverCountryText = useDashboardStore((state) => state.serverCountry);

    const [isLogsOpen, setIsLogsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("Overview");

    const handleToggleLogs = () => {
        setIsLogsOpen((prev) => !prev);
    };

    useEffect(() => {
        setServerCountry(serverCountryText === null ? "Loading..." : String(serverCountryText));
    }, [serverCountryText]);
    
    return (
        <div className="w-full h-full grid grid-rows-12 grid-cols-12 gap-0 z-10 overflow-hidden relative">
            <div className="absolute w-full h-full bg-dashboard-pattern mask-b-from-2.5 -z-5 bg-cover bg-fixed scale-x-[-1] scale-y-[-1] scale-500
            animate-[pulse_6s_ease-in-out_infinite]"></div>
            
            <Header serverCountry={serverCountry}/>

            <NavigationBar 
              activeTab={activeTab}
              onSelectTab={(tab) => {
                  setActiveTab(tab);
                  setIsLogsOpen(false); 
              }}
              onToggleLogs={handleToggleLogs}
              isLogsOpen={isLogsOpen}
            />

            <Content activeTab={activeTab}/>
            

            <AnimatePresence>
                {isLogsOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setIsLogsOpen(false)}
                        className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-8"
                    >
                        <div className="relative w-full max-w-4xl flex flex-col">
                            {/* Close */}
                            <button 
                                onClick={() => setIsLogsOpen(false)}
                                className="absolute -top-3 -right-3 z-10 bg-gray-900 border border-blue-500/40 text-gray-300 hover:text-white px-3 py-1 rounded-full text-xs font-mono shadow-lg"
                            >
                                [CLOSE]
                            </button>

                            <TerminalLogModal/>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
        
    );
}