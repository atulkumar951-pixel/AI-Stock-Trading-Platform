interface Props {
    title: string;
    value: string | number;
    color: string;
}

export default function AnalyticsCard({
    title,
    value,
    color,
}: Props) {

    return (

        <div
            className="
                rounded-xl
                border
                border-slate-700
                bg-[#1c2436]
                p-5
            "
        >

            <p className="text-slate-400 text-sm">

                {title}

            </p>

            <h2
                className={`text-3xl font-bold mt-3 ${color}`}
            >

                {value}

            </h2>

        </div>

    );

}