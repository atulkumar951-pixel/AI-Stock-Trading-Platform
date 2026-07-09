interface Props {
    prediction: {
        recommendation: string;
        reason: string;
        confidence: number;
        signal: string;
    };
}

export default function AIRecommendationCard({
    prediction,
}: Props) {

    const badge =
        prediction.signal === "BUY"
            ? "bg-green-500"
            : prediction.signal === "SELL"
            ? "bg-red-500"
            : "bg-yellow-500";

    return (
        <div className="rounded-2xl bg-[#1c2436] border border-slate-700 p-6">

            <div className="flex justify-between items-center">

                <h2 className="text-2xl font-bold">
                    AI Recommendation
                </h2>

                <span className={`${badge} px-4 py-2 rounded-lg font-semibold`}>
                    {prediction.recommendation}
                </span>

            </div>

            <div className="mt-6">

                <p className="text-slate-400">
                    Confidence
                </p>

                <h1 className="text-5xl font-bold mt-2">
                    {prediction.confidence}%
                </h1>

            </div>

            <div className="mt-8">

                <p className="text-slate-400 mb-2">
                    AI Reason
                </p>

                <p className="leading-7 text-slate-300">
                    {prediction.reason}
                </p>

            </div>

        </div>
    );
}