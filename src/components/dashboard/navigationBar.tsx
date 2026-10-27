import { usePathname } from "next/navigation";
import SideBarButton from "@/components/cards/sidebarButton"

interface Props {
    pathName: string
}

export default function NavigationBar({pathName}: Props) {
    const overviewIconURL: string  = "/icons/overview-icon.png";
    const analyticsIconURL: string  = "/icons/analytics-icon.png";
    const logsIconURL: string  = "/icons/logs-icon-1.png";
    const sideBarButtonStyleNormal: string = "aspect-square hover:border-b hover:border-white/20 hover:scale-104";
    const sideBarButtonStyleHighlighted: string = "aspect-square scale-104 border-t border-white/10 bg-linear-to-tl from-white/10 to-white/0";
    
    const navLinks = [
        { name: "Overview", href: "../overview", icon: overviewIconURL},
        { name: "Analytics", href: "../dashboard", icon: analyticsIconURL},
        { name: "Logs", href: "../logs", icon: logsIconURL}
    ]

    return(
            <div className="row-start-2 row-span-11 flex flex-col bg-linear-to-t from-cyan-500/30 to-blue-950/0 backdrop-blur-lg gap-2 p-1 overflow-hidden">
            {navLinks.map((link) => {
                const isPath = pathName === link.href.substring(2,link.href.length);

                return (
                    <SideBarButton key={link.href} url={link.href} iconUrl={link.icon} buttonText={link.name} className={`${isPath ? sideBarButtonStyleHighlighted : sideBarButtonStyleNormal}`}/>
                )
            })}
            </div>
    )
}