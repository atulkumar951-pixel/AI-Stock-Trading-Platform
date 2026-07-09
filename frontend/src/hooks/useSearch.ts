import { useQuery } from "@tanstack/react-query";

import { searchStocks } from "../api/search";

export const useSearch = (query: string) => {

    return useQuery({

        queryKey: ["search", query],

        queryFn: () => searchStocks(query),

        enabled: query.length > 0,

        staleTime: 30000,

    });

};