import { useQuery } from "@tanstack/react-query";

import { getQuote } from "../api/quote";

export function useQuote(
    instrumentKey?: string
) {

    return useQuery({

        queryKey: [
            "quote",
            instrumentKey,
        ],

        enabled: !!instrumentKey,

        queryFn: () =>
            getQuote(
                instrumentKey!
            ),

        refetchInterval: 5000,

    });

}