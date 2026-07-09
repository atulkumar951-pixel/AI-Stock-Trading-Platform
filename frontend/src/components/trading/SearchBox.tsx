import { useState, useEffect, useRef } from "react";
import { Search, Star } from "lucide-react";

import { useSearch } from "../../hooks/useSearch";
import { useAddWatchlist } from "../../hooks/useWatchlist";

interface SearchBoxProps {
    onSelect: (instrument: any) => void;
}

export default function SearchBox({
    onSelect,
}: SearchBoxProps) {

    const [query, setQuery] = useState("");

    const [showResults, setShowResults] = useState(false);

    const wrapperRef = useRef<HTMLDivElement>(null);

    const { data } = useSearch(query);

    const addWatchlist = useAddWatchlist();

    useEffect(() => {

        const handler = (e: MouseEvent) => {

            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(e.target as Node)
            ) {
                setShowResults(false);
            }

        };

        document.addEventListener("mousedown", handler);

        return () => {

            document.removeEventListener(
                "mousedown",
                handler
            );

        };

    }, []);

    return (

        <div
            ref={wrapperRef}
            className="relative"
        >

            {/* Search Input */}

            <div className="relative">

                <Search
                    size={18}
                    className="absolute left-3 top-3 text-slate-400"
                />

                <input
                    value={query}
                    onChange={(e) => {

                        setQuery(e.target.value);

                        setShowResults(true);

                    }}
                    placeholder="Search Stocks or Indices..."
                    className="
                        w-full
                        bg-[#1c2436]
                        border
                        border-slate-700
                        rounded-xl
                        pl-10
                        pr-4
                        py-3
                        outline-none
                        focus:border-blue-500
                    "
                />

            </div>

            {addWatchlist.isPending && (

                <div className="p-2 text-xs text-green-400">

                    Adding...

                </div>

            )}

            {/* Search Results */}

            {showResults &&
                query.length > 0 &&
                data &&
                data.length > 0 && (

                    <div
                        className="
                            absolute
                            z-50
                            mt-2
                            w-full
                            rounded-xl
                            bg-[#1c2436]
                            border
                            border-slate-700
                            shadow-xl
                            max-h-96
                            overflow-y-auto
                        "
                    >

                        {data.map((item: any) => (

                            <div
                                key={item.instrument_key}
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    px-4
                                    py-3
                                    border-b
                                    border-slate-700
                                    last:border-b-0
                                    hover:bg-slate-800
                                "
                            >

                                <button
                                    className="flex-1 text-left"
                                    onClick={() => {

                                        onSelect(item);

                                        setQuery(item.symbol);

                                        setShowResults(false);

                                    }}
                                >

                                    <div className="font-semibold">

                                        {item.symbol}

                                    </div>

                                    <div className="text-sm text-slate-400">

                                        {item.name}

                                    </div>

                                </button>

                                <button
                                    className="ml-3 text-yellow-400 hover:scale-110 transition"
                                    onClick={() => {

                                        addWatchlist.mutate(
                                            {
                                                symbol: item.symbol,
                                                name: item.name,
                                                exchange: item.exchange,
                                                instrument_key: item.instrument_key,
                                            },
                                            {
                                                onSuccess: () => {

                                                    setShowResults(false);

                                                },
                                            }
                                        );

                                    }}
                                >

                                    <Star size={18} />

                                </button>

                            </div>

                        ))}

                    </div>

                )}

        </div>

    );

}