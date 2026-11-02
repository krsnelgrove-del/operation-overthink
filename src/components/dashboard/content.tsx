import { DashboardCards } from "@/app/dashboard/(config)/dashboardCards";

export default function Content() {
    const panelStyle: string = "rounded-xl bg-zinc-900/30 border border-white/10 overflow-hidden backdrop-blur-sm";

return(
    <div className="row-start-2 col-start-2 col-span-11 bg-linear-to-tr from-cyan-500/20 to-black/50 row-span-11 p-8 border-l border-t border-white/30 rounded-b-none rounded-r-none rounded-l-2xl rounded-t-2xl overflow-y-auto">
        <div className="w-full h-full grid grid-flow-col grid-cols-3 grid-rows-2 gap-4">
            {DashboardCards.map((card) => {
                const CardComponent = card.component;
                return (
                <div
                key={card.id}
                className={`${panelStyle} ${card.gridSpan || ""}`}>
                    <CardComponent title={card.title} data={card.initialData}/>
                </div>
                );
            })}
        </div>
    </div>
)
}