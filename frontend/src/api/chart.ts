import api from "./axios";

export const getChart = async (
    instrumentKey: string,
    interval = "day"
) => {
    const { data } = await api.get(
        `/chart/${encodeURIComponent(instrumentKey)}`,
        {
            params: {
                interval,
            },
        }
    );

    return data;
};