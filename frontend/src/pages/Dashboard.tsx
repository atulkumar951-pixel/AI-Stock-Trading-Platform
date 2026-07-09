import StatCard from "../components/cards/StatCard";
import PredictionCard from "../components/cards/PredictionCard";
import MarketCard from "../components/cards/MarketCard";
import AnalyticsCard from "../components/cards/AnalyticsCard";
import SystemPanel from "../components/cards/SystemPanel";
import AIRecommendationCard from "../components/cards/AIRecommendationCard";
import PortfolioSummary from "../components/cards/PortfolioSummary";

import ConfidenceBar from "../components/charts/ConfidenceBar";
import RiskMeter from "../components/charts/RiskMeter";
import SignalGauge from "../components/charts/SignalGauge";

import RecentPredictionsTable from "../components/tables/RecentPredictionsTable";

import { useDashboard } from "../hooks/useDashboard";
import { useMarket } from "../hooks/useMarket";

import {
    Brain,
    TrendingUp,
    TrendingDown,
    MinusCircle,
    BarChart3,
    Activity,
} from "lucide-react";

export default function Dashboard() {

    const {
        data,
        isLoading,
        isError,
        error,
    } = useDashboard();

    const { data: market } = useMarket();

    if (isLoading) {
        return (
            <div className="text-white text-xl">
                Loading Dashboard...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-red-500 text-lg">
                {String(error)}
            </div>
        );
    }

    if (!data) {
        return (
            <div className="text-red-500 text-lg">
                No Dashboard Data
            </div>
        );
    }

    return (

        <div className="space-y-8">

            <h1 className="text-4xl font-bold text-white">
                Dashboard
            </h1>

            {/* ===================== */}
            {/* Statistics */}
            {/* ===================== */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                <StatCard
                    title="Total Predictions"
                    value={data.summary.total_predictions}
                    icon={<Brain size={28} />}
                    color="bg-blue-500/20 text-blue-400"
                    subtitle="Lifetime"
                />

                <StatCard
                    title="BUY Signals"
                    value={data.summary.buy_signals}
                    icon={<TrendingUp size={28} />}
                    color="bg-green-500/20 text-green-400"
                    subtitle="Generated"
                />

                <StatCard
                    title="SELL Signals"
                    value={data.summary.sell_signals}
                    icon={<TrendingDown size={28} />}
                    color="bg-red-500/20 text-red-400"
                    subtitle="Generated"
                />

                <StatCard
                    title="HOLD Signals"
                    value={data.summary.hold_signals}
                    icon={<MinusCircle size={28} />}
                    color="bg-yellow-500/20 text-yellow-400"
                    subtitle="Generated"
                />

                <StatCard
                    title="Average Confidence"
                    value={`${data.summary.average_confidence}%`}
                    icon={<BarChart3 size={28} />}
                    color="bg-purple-500/20 text-purple-400"
                    subtitle="AI Confidence"
                />

                <StatCard
                    title="Active Symbols"
                    value={data.statistics.active_symbols}
                    icon={<Activity size={28} />}
                    color="bg-cyan-500/20 text-cyan-400"
                    subtitle="Tracked"
                />

            </div>

            {/* ===================== */}
            {/* Latest Prediction */}
            {/* ===================== */}

            <PredictionCard
                prediction={data.latest_prediction}
            />

            {/* ===================== */}
            {/* AI Widgets */}
            {/* ===================== */}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <ConfidenceBar
                    confidence={data.latest_prediction.confidence}
                />

                <SignalGauge
                    signal={data.latest_prediction.signal}
                    confidence={data.latest_prediction.confidence}
                />

                <RiskMeter
                    riskReward={data.latest_prediction.risk_reward}
                />

            </div>

            {/* ===================== */}
            {/* System + Recent */}
            {/* ===================== */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                <SystemPanel
                    system={data.system}
                />

                <RecentPredictionsTable
                    predictions={data.recent_predictions}
                />

            </div>

            {/* ===================== */}
            {/* AI Recommendation */}
            {/* ===================== */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                <AIRecommendationCard
                    prediction={data.latest_prediction}
                />

                <PortfolioSummary
                    predictions={data.summary.total_predictions}
                    buy={data.summary.buy_signals}
                    sell={data.summary.sell_signals}
                    hold={data.summary.hold_signals}
                />

            </div>

            {/* ===================== */}
            {/* Market */}
            {/* ===================== */}

            {Array.isArray(market) && market.length > 0 && (

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">

                    {market.map((item: any) => (

                        <MarketCard
                            key={item.name}
                            title={item.name}
                            price={item.price ?? 0}
                            change={item.change ?? 0}
                        />

                    ))}

                </div>

            )}

            {/* ===================== */}
            {/* Analytics */}
            {/* ===================== */}

            <div>

                <h2 className="text-2xl font-bold mb-6">
                    AI Analytics
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">

                    <AnalyticsCard
                        title="Today's Predictions"
                        value={data.statistics.today_predictions}
                        color="text-cyan-400"
                    />

                    <AnalyticsCard
                        title="Win Rate"
                        value={`${data.statistics.win_rate}%`}
                        color="text-green-400"
                    />

                    <AnalyticsCard
                        title="Active Symbols"
                        value={data.statistics.active_symbols}
                        color="text-yellow-400"
                    />

                    <AnalyticsCard
                        title="BUY Signals"
                        value={data.summary.buy_signals}
                        color="text-green-400"
                    />

                    <AnalyticsCard
                        title="SELL Signals"
                        value={data.summary.sell_signals}
                        color="text-red-400"
                    />

                </div>

            </div>

        </div>

    );

}