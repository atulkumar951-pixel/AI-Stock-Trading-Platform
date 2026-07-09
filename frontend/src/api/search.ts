import api from "./axios";

export const searchStocks = async (query: string) => {

    const response = await api.get("/search", {
        params: {
            q: query,
        },
    });

    return response.data;
};