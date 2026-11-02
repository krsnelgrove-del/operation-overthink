"use client"

import "../globals.css";
import Header from "@/components/dashboard/header";
import NavigationBar from "@/components/dashboard/navigationBar";
import Content from "@/components/dashboard/content";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDashboardStore } from "../(utils)/useMetricsStore";

export default function Dashboard() {
    const pathName = usePathname();
    const [serverCountry, setServerCountry] = useState<string>("Loading...");
    const serverCountryText = useDashboardStore((state) => state.serverCountry);

    useEffect(() => {
        setServerCountry(serverCountryText === null ? "Loading..." : String(serverCountryText));
    }, [serverCountryText]);
    
    return (
        <div className="w-full h-full grid grid-rows-12 grid-cols-12 gap-0 z-10 overflow-hidden">
            <div className="absolute w-full h-full bg-dashboard-pattern mask-b-from-2.5 -z-5 bg-cover bg-fixed scale-x-[-1] scale-y-[-1] scale-500
            animate-[pulse_6s_ease-in-out_infinite]"></div>
            
            <Header serverCountry={serverCountry}/>
            <NavigationBar pathName={pathName}/>
            <Content/>
        </div>
    )
}