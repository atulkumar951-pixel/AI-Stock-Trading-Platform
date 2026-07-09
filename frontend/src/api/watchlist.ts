import api from "./axios";

export const getWatchlist = async () => {

    const { data } = await api.get("/watchlist/items");

    return data;

};

export const addWatchlist = async (item: any) => {

    const { data } = await api.post(
        "/watchlist/items",
        item
    );

    return data;

};

export const removeWatchlist = async (
    instrumentKey: string
) => {

    const { data } = await api.delete(
        `/watchlist/items/${encodeURIComponent(instrumentKey)}`
    );

    return data;

};

export const existsWatchlist = async (
    instrumentKey: string
) => {

    const { data } = await api.get(
        `/watchlist/items/${encodeURIComponent(instrumentKey)}`
    );

    return data;

};