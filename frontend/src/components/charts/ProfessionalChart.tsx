import {
    createChart,
    CandlestickSeries,
    ColorType,
} from "lightweight-charts";

import {
    useEffect,
    useRef,
} from "react";

import { useChart } from "../../hooks/useChart";

interface ProfessionalChartProps {
    instrumentKey?: string;
    interval?: string;
}

export default function ProfessionalChart({
    instrumentKey,
    interval = "day",
}: ProfessionalChartProps) {

    const containerRef = useRef<HTMLDivElement>(null);

    const { data, isLoading } = useChart(
        instrumentKey,
        interval
    );

    useEffect(() => {

        if (!containerRef.current) return;

        const chart = createChart(containerRef.current, {

            width: containerRef.current.clientWidth,

            height: 620,

            layout: {

                background: {
                    type: ColorType.Solid,
                    color: "#1c2436",
                },

                textColor: "#d1d5db",

            },

            grid: {

                vertLines: {
                    color: "#334155",
                },

                horzLines: {
                    color: "#334155",
                },

            },

            rightPriceScale: {
                borderColor: "#475569",
            },

            timeScale: {
                borderColor: "#475569",
                timeVisible: true,
            },

            crosshair: {
                mode: 1,
            },

        });

        const candleSeries = chart.addSeries(
            CandlestickSeries,
            {}
        );

        if (Array.isArray(data) && data.length > 0) {

            const chartData = data.map((c: any) => ({

                time: interval === "day"
                    ? c.time
                    : Math.floor(new Date(c.time).getTime() / 1000),

                open: Number(c.open),

                high: Number(c.high),

                low: Number(c.low),

                close: Number(c.close),

            }));
            chartData.sort((a, b) =>
                String(a.time).localeCompare(String(b.time))
            );

            console.log("=================================");
            console.log("Interval :", interval);
            console.log("Length :", chartData.length);
            console.log("First :", chartData[0]);
            console.log("Last :", chartData[chartData.length - 1]);
            console.log("Complete :", chartData);
            console.log("=================================");

            candleSeries.setData(chartData);

            chart.timeScale().fitContent();

        }

        const resize = () => {

            if (!containerRef.current) return;

            chart.applyOptions({

                width: containerRef.current.clientWidth,

            });

        };

        window.addEventListener(
            "resize",
            resize
        );

        return () => {

            window.removeEventListener(
                "resize",
                resize
            );

            chart.remove();

        };

    }, [data, interval]);

    if (!instrumentKey) {

        return (

            <div className="flex items-center justify-center h-[620px] text-slate-500">

                Select a stock or index

            </div>

        );

    }

    if (isLoading) {

        return (

            <div className="flex items-center justify-center h-[620px]">

                Loading Chart...

            </div>

        );

    }

    return (

        <div
            ref={containerRef}
            className="w-full h-[620px]"
        />

    );

} 