import { useMutation } from "@tanstack/react-query";
import { predictLive } from "../api/prediction";

export function usePrediction() {
    return useMutation({
        mutationFn: predictLive,
    });
}