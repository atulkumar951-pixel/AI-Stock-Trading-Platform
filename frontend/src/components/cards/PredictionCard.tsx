interface PredictionCardProps {
    prediction: {
        symbol: string;
        signal: string;
        confidence: number;
        entry_price: number;
        target_price: number;
        stop_loss: number;
        expected_return: number;
        risk_reward: number;
        created_at: string;
        recommendation: string;
        reason: string;
    };
}

export default function PredictionCard({
    prediction,
}: PredictionCardProps) {

    const signalColor =
        prediction.signal === "BUY"
            ? "bg-green-500"
            : prediction.signal === "SELL"
            ? "bg-red-500"
            : "bg-yellow-500";

    return (
        <div className="rounded-2xl bg-[#1c2436] border border-slate-700 p-6">

            <div className="flex justify-between items-center">

                <div>
                    <h2 className="text-2xl font-bold">
                        Latest AI Prediction
                    </h2>

                    <p className="text-slate-400 mt-1">
                        {prediction.symbol}
                    </p>
                </div>

                <span
                    className={`${signalColor} px-4 py-2 rounded-lg font-semibold text-white`}
                >
                    {prediction.signal}
                </span>

            </div>

            <div className="grid grid-cols-2 gap-6 mt-8">

                <div>
                    <p className="text-slate-400 text-sm">
                        Confidence
                    </p>

                    <h3 className="text-2xl font-bold">
                        {prediction.confidence}%
                    </h3>
                </div>

                <div>
                    <p className="text-slate-400 text-sm">
                        Entry Price
                    </p>

                    <h3 className="text-2xl font-bold">
                        ₹ {prediction.entry_price}
                    </h3>
                </div>

                <div>
                    <p className="text-slate-400 text-sm">
                        Target Price
                    </p>

                    <h3 className="text-green-400 text-xl font-bold">
                        ₹ {prediction.target_price}
                    </h3>
                </div>

                <div>
                    <p className="text-slate-400 text-sm">
                        Stop Loss
                    </p>

                    <h3 className="text-red-400 text-xl font-bold">
                        ₹ {prediction.stop_loss}
                    </h3>
                </div>

                <div>
                    <p className="text-slate-400 text-sm">
                        Expected Return
                    </p>

                    <h3 className="text-blue-400 text-xl font-bold">
                        {prediction.expected_return}%
                    </h3>
                </div>

                <div>
                    <p className="text-slate-400 text-sm">
                        Risk / Reward
                    </p>

                    <h3 className="text-purple-400 text-xl font-bold">
                        1 : {prediction.risk_reward}
                    </h3>
                </div>


                <div className="mt-8 border-t border-slate-700 pt-6">
                    <h3 className="text-lg font-semibold mb-3">

                        AI Recommendation

                    </h3>

                    <p className="text-green-400 text-xl font-bold">
                        {prediction.recommendation}
                    </p>

                    <p className="text-slate-400 mt-3">
                        {prediction.reason}
                    </p>
                </div>




            </div>

        </div>
    );
}