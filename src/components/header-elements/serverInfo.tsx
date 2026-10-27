interface Props {
        serverCountry: string,
}

export default function ServerInfo({serverCountry}: Props) {
    return(
    <div className="col-span-3 flex flex-col text-white text-sm border-r border-white/20">
        <h3 className="font-extrabold">Server Info</h3>
        <h3 className="text-gray-400">Location: {serverCountry}</h3>
        </div>
    )
}