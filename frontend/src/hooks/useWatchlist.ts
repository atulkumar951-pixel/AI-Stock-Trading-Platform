import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {

    getWatchlist,

    addWatchlist,

    removeWatchlist,

} from "../api/watchlist";

export function useWatchlist() {

    return useQuery({

        queryKey: ["watchlist"],

        queryFn: getWatchlist,

        refetchInterval: 5000,

        staleTime: 0,

        refetchOnWindowFocus: true,

    });

}

export function useAddWatchlist() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: addWatchlist,

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["watchlist"]

            });

        },

    });

}

export function useRemoveWatchlist() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: removeWatchlist,

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["watchlist"]

            });

        },

    });

}