interface Props {

    title: string;

    price: number;

    change: number;

}

export default function MarketCard({

    title,

    price,

    change

}: Props) {

    const positive = change >= 0;

    return (

        <div className="rounded-2xl bg-[#1c2436] border border-slate-700 p-6">

            <h2 className="text-slate-400">

                {title}

            </h2>

            <h1 className="text-3xl font-bold mt-3">

                {price}

            </h1>

            <p
                className={
                    positive
                        ? "text-green-400 mt-2"
                        : "text-red-400 mt-2"
                }
            >

                {positive ? "▲" : "▼"} {change}%

            </p>

        </div>

    );

}