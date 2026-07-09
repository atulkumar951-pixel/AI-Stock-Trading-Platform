interface Prediction {
    symbol: string;
    signal: string;
    confidence: number;
    created_at: string;
}

interface Props {
    predictions: Prediction[];
}

export default function RecentPredictionsTable({
    predictions,
}: Props) {

    const badgeColor = (signal: string) => {

        if (signal === "BUY")
            return "bg-green-500/20 text-green-400";

        if (signal === "SELL")
            return "bg-red-500/20 text-red-400";

        return "bg-yellow-500/20 text-yellow-400";
    };

    return (

        <div className="rounded-2xl bg-[#1c2436] border border-slate-700 p-6">

            <div className="flex justify-between items-center mb-6">

                <h2 className="text-xl font-semibold">
                    Recent Predictions
                </h2>

                <span className="text-slate-400 text-sm">
                    Last {predictions.length} Signals
                </span>

            </div>

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead>

                        <tr className="border-b border-slate-700 text-slate-400">

                            <th className="text-left py-3">Symbol</th>
                            <th className="text-left py-3">Signal</th>
                            <th className="text-left py-3">Confidence</th>
                            <th className="text-left py-3">Time</th>

                        </tr>

                    </thead>

                    <tbody>

                        {predictions.map((prediction, index) => (

                            <tr
                                key={index}
                                className="border-b border-slate-800 hover:bg-slate-800/40 transition-colors"
                            >

                                <td className="py-4 font-semibold">
                                    {prediction.symbol}
                                </td>

                                <td className="py-4">

                                    <span
                                        className={`px-3 py-1 rounded-lg text-sm font-semibold ${badgeColor(
                                            prediction.signal
                                        )}`}
                                    >
                                        {prediction.signal}
                                    </span>

                                </td>

                                <td className="py-4">

                                    {prediction.confidence.toFixed(2)}%

                                </td>

                                <td className="py-4 text-slate-400">

                                    {new Date(
                                        prediction.created_at
                                    ).toLocaleString()}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}