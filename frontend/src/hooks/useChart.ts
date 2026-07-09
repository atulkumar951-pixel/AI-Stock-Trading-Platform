import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export function useChart(
    instrumentKey?: string,
    interval: string = "day"
) {

    return useQuery({

        queryKey: ["chart", instrumentKey, interval],

        enabled: Boolean(instrumentKey),

        refetchOnWindowFocus: false,

        queryFn: async () => {

            try {

                console.log("=================================");
                console.log("Fetching Chart");
                console.log("Instrument :", instrumentKey);
                console.log("Interval :", interval);
                console.log("=================================");

                const response = await api.get(
                    `/chart/${encodeURIComponent(instrumentKey!)}`,
                    {
                        params: {
                            interval,
                        },
                    }
                );

                console.log("Chart Response:");
                console.log(response.data);

                return response.data;

            } catch (error: any) {

                console.error("Chart API Error");

                console.error(error);

                if (error.response) {

                    console.error("Status :", error.response.status);
                    console.error("Response :", error.response.data);

                }

                throw error;

            }

        },

    });

}