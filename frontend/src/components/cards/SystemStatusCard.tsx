interface Props {
    title: string;
    value: string;
}

export default function SystemStatusCard({
    title,
    value,
}: Props) {

    const color =
        value === "ONLINE" ||
        value === "CONNECTED" ||
        value === "LOADED" ||
        value === "OPEN"
            ? "bg-green-500"
            : value === "PRE-OPEN"
            ? "bg-yellow-500"
            : "bg-red-500";

    return (

        <div className="flex justify-between items-center border-b border-slate-700 py-4">

            <span className="text-slate-400">

                {title}

            </span>

            <div className="flex items-center gap-3">

                <div
                    className={`w-3 h-3 rounded-full ${color}`}
                />

                <span className="font-semibold">

                    {value}

                </span>

            </div>

        </div>

    );

}