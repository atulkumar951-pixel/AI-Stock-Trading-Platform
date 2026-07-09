interface Props {
    riskReward: number;
}

export default function RiskMeter({
    riskReward,
}: Props) {

    const color =
        riskReward >= 3
            ? "text-green-400"
            : riskReward >= 2
            ? "text-yellow-400"
            : "text-red-400";

    const progress =
        Math.min(riskReward * 25, 100);

    return (
        <div className="rounded-2xl bg-[#1c2436] border border-slate-700 p-6">

            <h2 className="text-xl font-bold mb-6">
                Risk Reward
            </h2>

            <div className="text-center">

                <h1 className={`text-5xl font-bold ${color}`}>
                    1 : {riskReward}
                </h1>

                <p className="text-slate-400 mt-3">
                    AI Estimated Ratio
                </p>

            </div>

            <div className="w-full bg-slate-800 rounded-full h-4 mt-8">

                <div
                    className="bg-cyan-500 h-4 rounded-full transition-all duration-1000"
                    style={{
                        width: `${progress}%`,
                    }}
                />

            </div>

        </div>
    );
}