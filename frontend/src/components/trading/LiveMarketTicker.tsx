import { TrendingDown, TrendingUp } from "lucide-react";
import { useMarket } from "../../hooks/useMarket";

export default function LiveMarketTicker() {

    const { data, isLoading } = useMarket();

    if (isLoading) {

        return (

            <div className="rounded-xl bg-[#1c2436] border border-slate-700 p-4">

                Loading Live Market...

            </div>

        );

    }

    if (!data) return null;

    return (

        <div className="rounded-xl bg-[#1c2436] border border-slate-700 overflow-hidden">

            <div className="flex overflow-x-auto">

                {data.map((item: any) => {

                    const positive = item.change >= 0;

                    return (

                        <div
                            key={item.name}
                            className="min-w-[220px] border-r border-slate-700 px-6 py-4"
                        >

                            <div className="text-sm text-slate-400">

                                {item.name}

                            </div>

                            <div className="text-2xl font-bold mt-2">

                            {Number(item.price ?? 0).toLocaleString()}
                            </div>

                            <div
                                className={`flex items-center gap-2 mt-2 ${
                                    positive
                                        ? "text-green-400"
                                        : "text-red-400"
                                }`}
                            >

                                {positive
                                    ? <TrendingUp size={16}/>
                                    : <TrendingDown size={16}/>}

                                {item.change}

                            </div>

                            <div className="mt-4 text-sm text-slate-400 space-y-1">

                                <div>Open : {item.open}</div>

                                <div>High : {item.high}</div>

                                <div>Low : {item.low}</div>

                                <div>Close : {item.close}</div>

                            </div>

                        </div>

                    );

                })}

            </div>

        </div>

    );

}