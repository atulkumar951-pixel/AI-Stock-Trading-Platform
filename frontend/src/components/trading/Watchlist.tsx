import { Trash2 } from "lucide-react";

import {
    useWatchlist,
    useRemoveWatchlist,
} from "../../hooks/useWatchlist";

interface Props {
    selectedInstrument?: any;
    onSelect: (item: any) => void;
}

export default function Watchlist({
    selectedInstrument,
    onSelect,
}: Props) {

    const { data } = useWatchlist();

    const remove = useRemoveWatchlist();

    if (!data) {
        return null;
    }

    return (

        <div className="rounded-2xl bg-[#1c2436] border border-slate-700 p-5">

            <h2 className="text-xl font-semibold mb-5">
                Watchlist
            </h2>

            <div className="space-y-3">

                {data.length === 0 && (

                    <div className="text-slate-500">
                        No Stocks Added
                    </div>

                )}

                {data.map((item: any) => (

                    <div
                        key={item.instrument_key}
                        className={`

                            flex
                            items-center
                            justify-between
                            rounded-lg
                            p-3
                            transition-all

                            ${
                                selectedInstrument?.instrument_key === item.instrument_key
                                    ? "bg-blue-600"
                                    : "bg-slate-800 hover:bg-slate-700"
                            }

                        `}
                    >

                        <button
                            className="flex-1 text-left"
                            onClick={() => onSelect(item)}
                        >

                            <div className="font-semibold">
                                {item.symbol}
                            </div>

                            <div className="text-xs text-slate-400">
                                {item.name}
                            </div>

                        </button>

                        <button
                            onClick={() =>
                                remove.mutate(
                                    item.instrument_key
                                )
                            }
                            className="text-red-400 hover:text-red-500 transition"
                        >

                            <Trash2 size={18} />

                        </button>

                    </div>

                ))}

            </div>

        </div>

    );

}