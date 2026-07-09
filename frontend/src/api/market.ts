import api from "./axios";

export async function getMarket() {

    const { data } = await api.get("/market");

    console.log("Market API:", data);

    return data;
}