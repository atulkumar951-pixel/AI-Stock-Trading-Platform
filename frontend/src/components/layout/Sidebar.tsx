import {
    LayoutDashboard,
    CandlestickChart,
    LineChart,
    BarChart3,
    History,
    Wallet,
    Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";

interface SidebarProps {
    lightMode: boolean;
}

const menus = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        path: "/",
    },
    {
        title: "Trading",
        icon: CandlestickChart,
        path: "/trading",
    },
    {
        title: "Watchlist",
        icon: LineChart,
        path: "/watchlist",
    },
    {
        title: "Analytics",
        icon: BarChart3,
        path: "/analytics",
    },
    {
        title: "History",
        icon: History,
        path: "/history",
    },
    {
        title: "Portfolio",
        icon: Wallet,
        path: "/portfolio",
    },
    {
        title: "Settings",
        icon: Settings,
        path: "/settings",
    },
];

export default function Sidebar({
    lightMode,
}: SidebarProps) {
    return (
        <aside
            className={`w-64 h-screen sticky top-0 flex-shrink-0 overflow-y-auto p-5 border-r ${
                lightMode
                    ? "bg-white border-gray-200 text-gray-900"
                    : "bg-slate-900 border-slate-800 text-white"
            }`}
        >
            <h1 className="text-2xl font-bold mb-10">
                AI Trader
            </h1>

            <nav className="space-y-2">
                {menus.map((menu) => {
                    const Icon = menu.icon;

                    return (
                        <NavLink
                            key={menu.path}
                            to={menu.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                                    isActive
                                        ? "bg-blue-600 text-white"
                                        : lightMode
                                        ? "hover:bg-gray-100 text-gray-900"
                                        : "hover:bg-slate-800 text-white"
                                }`
                            }
                        >
                            <Icon size={20} />
                            <span>{menu.title}</span>
                        </NavLink>
                    );
                })}
            </nav>
        </aside>
    );
}