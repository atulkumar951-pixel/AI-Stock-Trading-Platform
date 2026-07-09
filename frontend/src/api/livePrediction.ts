import api from "./axios";

export const livePrediction = async (
    instrumentKey: string
) => {

    const response = await api.post(
        "/live/predict",
        {
            instrument_key: instrumentKey,
        }
    );

    return response.data;
};