import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "../api/dashboard";

export const useDashboard = () => {

    return useQuery({

        queryKey: ["dashboard"],

        queryFn: getDashboard,

        refetchInterval: 5000,

        staleTime: 0,

        refetchOnWindowFocus: true,

        retry: false,

    });

};