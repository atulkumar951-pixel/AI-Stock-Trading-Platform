import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

export default function MainLayout() {

    return (

        <div className="flex h-screen overflow-hidden bg-slate-950">

            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">

                <Header />

                <div className="flex-1 overflow-y-auto">

                    <main className="p-6">

                        <Outlet />

                    </main>

                    <Footer />

                </div>

            </div>

        </div>

    );

}