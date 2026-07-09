interface Props {
    system: {
        backend_status: string;
        database: string;
        model: string;
        market_status: string;
        upstox: string;
        last_updated: string | null;
    };
}

export default function SystemPanel({
    system,
}: Props) {

    const statusColor = (status: string) => {

        if (
            status === "ONLINE" ||
            status === "CONNECTED" ||
            status === "OPEN" ||
            status === "LOADED"
        ) {
            return "text-green-400";
        }

        if (status === "PRE-OPEN") {
            return "text-yellow-400";
        }

        return "text-red-400";
    };

    const Row = ({
        label,
        value,
    }: {
        label: string;
        value: string;
    }) => (

        <div className="flex justify-between border-b border-slate-700 py-3">

            <span className="text-slate-400">
                {label}
            </span>

            <span className={`font-semibold ${statusColor(value)}`}>
                {value}
            </span>

        </div>

    );

    return (

        <div className="rounded-2xl bg-[#1c2436] border border-slate-700 p-6">

            <h2 className="text-2xl font-bold mb-6">
                System Status
            </h2>

            <Row
                label="Backend"
                value={system.backend_status}
            />

            <Row
                label="Database"
                value={system.database}
            />

            <Row
                label="AI Model"
                value={system.model}
            />

            <Row
                label="Market"
                value={system.market_status}
            />

            <Row
                label="Upstox"
                value={system.upstox}
            />

            <div className="mt-5">

                <p className="text-slate-500 text-sm">
                    Last Updated
                </p>

                <p className="mt-1">
                    {system.last_updated ?? "--"}
                </p>

            </div>

        </div>

    );
}