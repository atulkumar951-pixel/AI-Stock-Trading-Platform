interface Props {
    confidence: number;
}

export default function ConfidenceBar({
    confidence,
}: Props) {

    const color =
        confidence >= 75
            ? "bg-green-500"
            : confidence >= 50
            ? "bg-yellow-500"
            : "bg-red-500";

    return (
        <div className="rounded-2xl bg-[#1c2436] border border-slate-700 p-6">

            <div className="flex justify-between items-center mb-4">

                <h2 className="text-xl font-bold">
                    AI Confidence
                </h2>

                <span className="text-2xl font-bold text-white">
                    {confidence}%
                </span>

            </div>

            <div className="w-full h-5 rounded-full bg-slate-800 overflow-hidden">

                <div
                    className={`${color} h-5 rounded-full transition-all duration-1000`}
                    style={{
                        width: `${confidence}%`,
                    }}
                />

            </div>

            <div className="flex justify-between mt-3 text-xs text-slate-400">

                <span>Low</span>

                <span>Medium</span>

                <span>High</span>

            </div>

        </div>
    );
}