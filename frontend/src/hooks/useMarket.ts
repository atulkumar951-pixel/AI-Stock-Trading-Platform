import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export function useMarket() {

    return useQuery({

        queryKey: ["market"],

        queryFn: async () => {

            const { data } = await api.get("/market");

            return data;

        },

        refetchInterval: 5000,

        staleTime: 0,

    });

}