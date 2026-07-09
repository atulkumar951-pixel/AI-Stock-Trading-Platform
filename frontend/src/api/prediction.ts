import axios from "axios";

const API = "http://127.0.0.1:8000";

export async function predictLive(instrumentKey: string) {
    const response = await axios.post(
        `${API}/live/predict`,
        {
            instrument_key: instrumentKey,
        }
    );

    return response.data;
}