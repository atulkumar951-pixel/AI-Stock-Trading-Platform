import type { ReactNode } from "react";

interface Props {
    title: string;
    value: string | number;
    icon: ReactNode;
    color: string;
    subtitle?: string;
}

export default function StatCard({
    title,
    value,
    icon,
    color,
    subtitle,
}: Props) {
    return (
        <div
            className="
                rounded-2xl
                bg-[#1c2436]
                border
                border-slate-700
                p-6
                hover:border-blue-500
                hover:scale-[1.02]
                transition-all
                duration-300
            "
        >
            <div className="flex justify-between items-center">

                <div>

                    <p className="text-slate-400 text-sm">
                        {title}
                    </p>

                    <h2 className="text-4xl font-bold text-white mt-2">
                        {value}
                    </h2>

                    {subtitle && (
                        <p className="text-slate-500 text-xs mt-2">
                            {subtitle}
                        </p>
                    )}

                </div>

                <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center ${color}`}
                >
                    {icon}
                </div>

            </div>
        </div>
    );
}