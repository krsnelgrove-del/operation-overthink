"use client"

import "../globals.css";
import SideBarButton from "@/components/cards/sidebarButton"
import { DashboardCards } from "./(config)/dashboardCards";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Dashboard() {
    const overviewIconURL: string  = "/icons/overview-icon.png";
    const analyticsIconURL: string  = "/icons/analytics-icon.png";
    const logsIconURL: string  = "/icons/logs-icon-1.png";
    
    const panelStyle: string = "rounded-xl bg-zinc-900/60 border border-white/10 overflow-hidden backdrop-blur-sm";
    const sideBarButtonStyleNormal: string = "aspect-square hover:border-b hover:border-white/20 hover:scale-104";
    const sideBarButtonStyleHighlighted: string = "aspect-square scale-104 border-t border-white/10 bg-linear-to-tl from-white/10 to-white/0";


    const navLinks = [
    { name: "Overview", href: "../overview", icon: overviewIconURL},
    { name: "Analytics", href: "../dashboard", icon: analyticsIconURL},
    { name: "Logs", href: "../logs", icon: logsIconURL}
    ]

    const pathName = usePathname();

    return (
        <div className="w-full h-full grid grid-rows-12 grid-cols-12 gap-0 z-10 overflow-hidden">
            <div className="absolute w-full h-full bg-dashboard-pattern mask-b-from-2.5 -z-5 bg-cover bg-fixed scale-x-[-1] scale-y-[-1] scale-500"></div>
            
            {/* Top Navigation Bar */}
            <div className="col-span-12 row-span-1 grid grid-cols-12 items-center bg-linear-to-l from-cyan-500/20 to-cyan-950/10 backdrop-blur-lg gap-2">
                <div className="flex items-center justify-center gap-2 col-span-1 border-r border-white/20 text-white font-bold tracking-wider">
                    <svg fill="#FFFFFF" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 shrink-0 drop-shadow-lg drop-shadow-blue-500">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier"> 
                        <path d="M20.288 9.463a4.856 4.856 0 0 0-4.336-2.3 4.586 4.586 0 0 0-3.343 1.767c.071.116.148.226.212.347l.879 1.652.134-.254a2.71 2.71 0 0 1 2.206-1.519 2.845 2.845 0 1 1 0 5.686 2.708 2.708 0 0 1-2.205-1.518L13.131 12l-1.193-2.26a4.709 4.709 0 0 0-3.89-2.581 4.845 4.845 0 1 0 0 9.682 4.586 4.586 0 0 0 3.343-1.767c-.071-.116-.148-.226-.212-.347l-.879-1.656-.134.254a2.71 2.71 0 0 1-2.206 1.519 2.855 2.855 0 0 1-2.559-1.369 2.825 2.825 0 0 1 0-2.946 2.862 2.862 0 0 1 2.442-1.374h.121a2.708 2.708 0 0 1 2.205 1.518l.7 1.327 1.193 2.26a4.709 4.709 0 0 0 3.89 2.581h.209a4.846 4.846 0 0 0 4.127-7.378z"></path> 
                        </g>
                        </svg>
                        </div>
                <div className="col-span-5 justify-self-start pl-4 text-white font-medium text-2xl"><h1>NEXUS</h1></div>
                <div className="col-span-2 text-white text-sm w-3/4 p-2 border rounded-md bg-linear-to-tl from-white/30 to-white/0 bg-blend-lighten drop-shadow-sm drop-shadow-blue-500">
                <h3>Status: 
                    <span className="text-green-400">ONLINE</span>
                    </h3>
                </div>
                <div className="col-span-3 text-white text-sm border-r border-white/20">
                    <h3>Location: <span>US-East</span></h3>
                </div>
                <div className="col-span-1 flex flex-row gap-2 items-center text-white text-sm text-right cursor-pointer animate-pulse hover:text-lg">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className=" w-6 h-6 shrink-0 right-0 fill-white drop-shadow-md drop-shadow-red-500">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path fillRule="inherit" clipRule="evenodd" d="M2 6.5C2 4.01472 4.01472 2 6.5 2H12C14.2091 2 16 3.79086 16 6V7C16 7.55228 15.5523 8 15 8C14.4477 8 14 7.55228 14 7V6C14 4.89543 13.1046 4 12 4H6.5C5.11929 4 4 5.11929 4 6.5V17.5C4 18.8807 5.11929 20 6.5 20H12C13.1046 20 14 19.1046 14 18V17C14 16.4477 14.4477 16 15 16C15.5523 16 16 16.4477 16 17V18C16 20.2091 14.2091 22 12 22H6.5C4.01472 22 2 19.9853 2 17.5V6.5ZM18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289L22.7071 11.2929C23.0976 11.6834 23.0976 12.3166 22.7071 12.7071L19.7071 15.7071C19.3166 16.0976 18.6834 16.0976 18.2929 15.7071C17.9024 15.3166 17.9024 14.6834 18.2929 14.2929L19.5858 13L11 13C10.4477 13 10 12.5523 10 12C10 11.4477 10.4477 11 11 11L19.5858 11L18.2929 9.70711C17.9024 9.31658 17.9024 8.68342 18.2929 8.29289Z" fill="#0F1729"></path>
                        </g>
                    </svg>
                    <span className="text-red-400">
                        <Link href={"../home"}>Logout</Link>
                    </span>
                </div>
            </div>

            {/* Sidebar */}
            <div className="row-start-2 row-span-11 flex flex-col bg-linear-to-t from-cyan-500/30 to-blue-950/0 backdrop-blur-lg gap-2 p-1 overflow-hidden">
            {navLinks.map((link) => {
                const isPath = pathName === link.href.substring(2,link.href.length);

                return (
                    <SideBarButton key={link.href} url={link.href} iconUrl={link.icon} buttonText={link.name} className={`${isPath ? sideBarButtonStyleHighlighted : sideBarButtonStyleNormal}`}/>
                )
            })}
            </div>

            {/* Main Content Grid */}
            <div className="row-start-2 col-start-2 col-span-11 bg-linear-to-tr from-cyan-500/20 to-black/50 row-span-11 p-8 border-l border-t border-white/30 rounded-b-none rounded-r-none rounded-l-2xl rounded-t-2xl overflow-y-auto">
                <div className="w-full h-full grid grid-flow-col grid-cols-3 grid-rows-2 gap-4">
                    {DashboardCards.map((card) => {
                        const CardComponent = card.component;
                        return (
                            <div
                                key={card.id}
                                className={`${panelStyle} ${card.gridSpan || ""}`}
                            >
                                <CardComponent title={card.title} data={card.initialData}/>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}