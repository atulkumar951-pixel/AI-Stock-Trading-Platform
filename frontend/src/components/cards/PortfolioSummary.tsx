interface Props {
    predictions: number;
    buy: number;
    sell: number;
    hold: number;
}

export default function PortfolioSummary({
    predictions,
    buy,
    sell,
    hold,
}: Props) {

    return (

        <div className="rounded-2xl bg-[#1c2436] border border-slate-700 p-6">

            <h2 className="text-2xl font-bold mb-6">
                Portfolio Summary
            </h2>

            <div className="space-y-5">

                <div className="flex justify-between">
                    <span>Total Predictions</span>
                    <span className="font-bold">{predictions}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-green-400">
                        BUY
                    </span>

                    <span>{buy}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-red-400">
                        SELL
                    </span>

                    <span>{sell}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-yellow-400">
                        HOLD
                    </span>

                    <span>{hold}</span>
                </div>

            </div>

        </div>

    );
}