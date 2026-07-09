import { useMutation, useQueryClient } from "@tanstack/react-query";
import { predictLive } from "../api/prediction";

export function usePrediction() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: predictLive,

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["dashboard"],
            });

            queryClient.invalidateQueries({
                queryKey: ["watchlist"],
            });

            queryClient.invalidateQueries({
                queryKey: ["history"],
            });

            queryClient.invalidateQueries({
                queryKey: ["analytics"],
            });

            queryClient.invalidateQueries({
                queryKey: ["market"],
            });

        },

    });

}