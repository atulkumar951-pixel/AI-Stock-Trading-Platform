interface Props {
    signal: string;
    confidence: number;
}

export default function SignalGauge({
    signal,
    confidence,
}: Props) {

    const color =
        signal === "BUY"
            ? "text-green-400 border-green-500"
            : signal === "SELL"
            ? "text-red-400 border-red-500"
            : "text-yellow-400 border-yellow-500";

    return (
        <div className="rounded-2xl bg-[#1c2436] border border-slate-700 p-6 flex flex-col items-center">

            <h2 className="text-xl font-bold mb-6">
                AI Signal
            </h2>

            <div
                className={`w-44 h-44 rounded-full border-[10px] flex flex-col items-center justify-center ${color}`}
            >

                <h1 className="text-4xl font-bold">
                    {signal}
                </h1>

                <p className="text-xl mt-2">
                    {confidence}%
                </p>

            </div>

        </div>
    );
}