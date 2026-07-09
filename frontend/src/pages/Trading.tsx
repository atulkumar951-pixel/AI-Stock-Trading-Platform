import { useState } from "react";

import SearchBox from "../components/trading/SearchBox";
import ProfessionalChart from "../components/charts/ProfessionalChart";
import LiveMarketTicker from "../components/trading/LiveMarketTicker";
import { usePrediction } from "../hooks/usePrediction";
import Watchlist from "../components/trading/Watchlist";

export default function Trading() {
    const [selectedInstrument, setSelectedInstrument] = useState<any>(null);
    const [interval, setChartInterval] = useState("day");

    const prediction = usePrediction();

    return (
        <div className="space-y-6">
            <h1 className="text-4xl font-bold">
                AI Trading Workspace
            </h1>

            {/* Search */}
            <SearchBox onSelect={setSelectedInstrument} />
            <LiveMarketTicker />

            <div className="grid grid-cols-12 gap-6">

                <div className="col-span-2">

                    <Watchlist

                        selectedInstrument={selectedInstrument}
                        onSelect={(item) => {setSelectedInstrument(item)
                            setSelectedInstrument(item);
                            prediction.reset();
                            prediction.mutate(item.instrument_key);
                        }}
                    />

                </div>

                {/* Chart */}
                <div className="col-span-7 rounded-2xl bg-[#1c2436] border border-slate-700 p-5 min-h-[650px]">

                    <div className="flex items-center justify-between mb-5">

                        <h2 className="text-xl font-semibold">
                            Market Chart
                        </h2>

                        <div className="flex gap-2 mb-4 flex-wrap">

                            <button
                                onClick={() => setChartInterval("1minute")}
                                className="px-3 py-2 rounded bg-slate-700 hover:bg-blue-600"
                            >
                                1M
                            </button>

                            <button
                                onClick={() => setChartInterval("30minute")}
                                className="px-3 py-2 rounded bg-slate-700 hover:bg-blue-600"
                            >
                                30M
                            </button>

                            <button
                                onClick={() => setChartInterval("day")}
                                className="px-3 py-2 rounded bg-slate-700 hover:bg-blue-600"
                            >
                                1D
                            </button>

                            <button
                                onClick={() => setChartInterval("week")}
                                className="px-3 py-2 rounded bg-slate-700 hover:bg-blue-600"
                            >
                                1W
                            </button>

                            <button
                                onClick={() => setChartInterval("month")}
                                className="px-3 py-2 rounded bg-slate-700 hover:bg-blue-600"
                            >
                                1MTH
                            </button>

                        </div>

                    </div>

                    <ProfessionalChart
                        instrumentKey={selectedInstrument?.instrument_key}
                        interval={interval}
                    />

                </div>

                {/* AI Prediction */}
                <div className="col-span-3 rounded-2xl bg-[#1c2436] border border-slate-700 p-5">

                    <h2 className="text-xl font-semibold mb-5">
                        AI Prediction
                    </h2>


                    {selectedInstrument ? (
                        <div className="space-y-5">

                            <div>
                                <p className="text-slate-400 text-sm">Symbol</p>
                                <h2 className="text-2xl font-bold">
                                    {selectedInstrument.symbol}
                                </h2>
                            </div>

                            <div>
                                <p className="text-slate-400 text-sm">Company</p>
                                <p>{selectedInstrument.name}</p>
                            </div>

                            <div>
                                <p className="text-slate-400 text-sm">Exchange</p>
                                <p>{selectedInstrument.exchange}</p>
                            </div>

                            <div>
                                <p className="text-slate-400 text-sm">
                                    Instrument Key
                                </p>

                                <p className="break-all text-sm">
                                    {selectedInstrument.instrument_key}
                                </p>
                            </div>

                            <button
                                onClick={() =>
                                    prediction.mutate(
                                        selectedInstrument.instrument_key
                                    )
                                }
                                disabled={prediction.isPending}
                                className="
                                    w-full
                                    mt-4
                                    bg-blue-600
                                    hover:bg-blue-700
                                    rounded-xl
                                    py-3
                                    font-semibold
                                    transition
                                    disabled:opacity-50
                                "
                            >
                                {prediction.isPending
                                    ? "Generating..."
                                    : "Generate AI Prediction"}
                            </button>

                            {prediction.data && (
                                <div className="mt-8 space-y-4 border-t border-slate-700 pt-6">

                                    <div className="flex justify-between">
                                        <span>Signal</span>
                                        <span className="font-bold text-green-400">
                                            {prediction.data.prediction.signal}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>Confidence</span>
                                        <span>
                                            {prediction.data.prediction.confidence}%
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>AI Score</span>
                                        <span>
                                            {prediction.data.prediction.ai_score}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>Recommendation</span>
                                        <span>
                                            {prediction.data.prediction.recommendation}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>Entry Price</span>
                                        <span>
                                            ₹ {prediction.data.market.entry_price}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>Target</span>
                                        <span className="text-green-400">
                                            ₹ {prediction.data.risk.target_price}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>Stop Loss</span>
                                        <span className="text-red-400">
                                            ₹ {prediction.data.risk.stop_loss}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>Expected Return</span>
                                        <span>
                                            {prediction.data.risk.expected_return}%
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>Risk Reward</span>
                                        <span>
                                            1 : {prediction.data.risk.risk_reward}
                                        </span>
                                    </div>

                                </div>
                            )}

                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-[500px] text-slate-500">
                            Search and select a stock or index.
                        </div>
                    )}
                    

                </div>
                

            </div>
            
        </div>
    );
}