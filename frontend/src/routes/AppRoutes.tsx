import { Routes, Route } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import Dashboard from "../pages/Dashboard";
import Watchlist from "../pages/Watchlist";
import Analytics from "../pages/Analytics";
import History from "../pages/History";
import Portfolio from "../pages/Portfolio";
import Settings from "../pages/Settings";
import Trading from "../pages/Trading";


export default function AppRoutes() {

    return (

        <Routes>

            <Route element={<MainLayout />}>

                <Route path="/" element={<Dashboard />} />

                <Route path="/watchlist" element={<Watchlist />} />

                <Route path="/analytics" element={<Analytics />} />

                <Route path="/history" element={<History />} />

                <Route path="/portfolio" element={<Portfolio />} />

                <Route path="/settings" element={<Settings />} />
        
                <Route path="/trading" element={<Trading />} />

            </Route>

        </Routes>

    );

}