import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";

export default function MainLayout() {

    const [lightMode, setLightMode] = useState(false);

    return (

        <div
            className={
                lightMode
                    ? "flex h-screen bg-gray-100 text-black"
                    : "flex h-screen bg-slate-950 text-white"
            }
        >

            <Sidebar lightMode={lightMode} />

            <div className="flex-1 flex flex-col">

                <Header
                    lightMode={lightMode}
                    setLightMode={setLightMode}
                />

                <main
                    className={
                        lightMode
                            ? "flex-1 overflow-auto p-6 bg-gray-100"
                            : "flex-1 overflow-auto p-6 bg-slate-950"
                    }
                >

                    <Outlet />

                </main>

            </div>

        </div>

    );

}