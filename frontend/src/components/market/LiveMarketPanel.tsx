import { useMarket } from "../../hooks/useMarket";

export default function LiveMarketPanel() {

    const { data, isLoading } = useMarket();

    if (isLoading) {
        return (
            <div className="rounded-xl bg-[#1c2436] p-4">
                Loading market...
            </div>
        );
    }

    if (!data) return null;

    const markets = [
        {
            title: "NIFTY 50",
            ...data.nifty,
        },
        {
            title: "BANK NIFTY",
            ...data.banknifty,
        },
    ];

    return (

        <div className="grid grid-cols-2 gap-4">

            {markets.map((item) => {

                const positive = item.change >= 0;

                return (

                    <div
                        key={item.title}
                        className="rounded-xl bg-[#1c2436] border border-slate-700 p-5"
                    >

                        <h3 className="text-lg font-semibold">

                            {item.title}

                        </h3>

                        <div className="text-3xl font-bold mt-4">

                            {item.price.toLocaleString()}

                        </div>

                        <div
                            className={
                                positive
                                    ? "text-green-400"
                                    : "text-red-400"
                            }
                        >

                            {item.change}

                        </div>

                        <div className="mt-4 text-sm text-slate-400 space-y-1">

                            <div>Open : {item.ohlc.open}</div>

                            <div>High : {item.ohlc.high}</div>

                            <div>Low : {item.ohlc.low}</div>

                            <div>Close : {item.ohlc.close}</div>

                        </div>

                    </div>

                );

            })}

        </div>

    );

}