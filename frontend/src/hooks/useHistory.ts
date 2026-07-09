import { useQuery } from "@tanstack/react-query";
import { getHistory } from "../api/history";

export const useHistory = () => {
    return useQuery({
        queryKey: ["history"],
        queryFn: getHistory,
    });
};