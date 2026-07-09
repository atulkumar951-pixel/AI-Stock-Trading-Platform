import api from "./axios";

export async function predictLive(instrumentKey: string) {

    const response = await api.post(
        "/live/predict",
        {
            instrument_key: instrumentKey,
        }
    );

    return response.data;
}