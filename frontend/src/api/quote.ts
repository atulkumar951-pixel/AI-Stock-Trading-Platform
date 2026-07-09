import api from "./axios";

export const getQuote = async (
    instrumentKey: string
) => {

    const { data } = await api.get(
        `/quote/${encodeURIComponent(
            instrumentKey
        )}`
    );

    return data;

};