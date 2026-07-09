import requests
import pandas as pd

from datetime import datetime

from app.auth.token_manager import token_manager
from app.services.cache_service import cache_service


class MarketService:

    BASE_URL = "https://api.upstox.com/v2"

    # ==========================================================
    # HEADERS
    # ==========================================================

    def get_headers(self):

        return {
            "Accept": "application/json",
            "Authorization": f"Bearer {token_manager.get_access_token()}",
        }

    # ==========================================================
    # MARKET QUOTE
    # ==========================================================

    def get_quote(self, instrument_key: str):

        url = f"{self.BASE_URL}/market-quote/quotes"

        params = {
            "instrument_key": instrument_key
        }

        response = requests.get(
            url,
            headers=self.get_headers(),
            params=params,
            timeout=30,
        )

        print("=" * 80)
        print("QUOTE STATUS :", response.status_code)
        print("QUOTE RESPONSE :", response.text)
        print("=" * 80)

        response.raise_for_status()

        return response.json()

    # ==========================================================
    # HISTORICAL DATA
    # ==========================================================

    def get_historical_data(
        self,
        instrument_key: str,
        interval: str = "day",
    ):

        cache_key = f"{instrument_key}_{interval}"

        cache = cache_service.get(cache_key)

        if cache is not None:
            return cache

        to_date = datetime.today().strftime("%Y-%m-%d")

        url = (
            f"{self.BASE_URL}/historical-candle/"
            f"{instrument_key}/"
            f"{interval}/"
            f"{to_date}"
        )

        print("=" * 80)
        print("INTERVAL REQUESTED :", interval)
        print("URL :", url)
        print("=" * 80)

        response = requests.get(
            url,
            headers=self.get_headers(),
            timeout=30,
        )

        print("=" * 80)
        print("URL :", url)
        print("STATUS :", response.status_code)

        if response.status_code != 200:

            print("=" * 80)
            print("ERROR STATUS :", response.status_code)
            print("ERROR BODY :")
            print(response.text)
            print("=" * 80)

        response.raise_for_status()
        data = response.json()

        print("Response Keys :", data.keys())

        if data["data"]["candles"]:
            print("Latest Candle :", data["data"]["candles"][0])

        print("=" * 80)

        cache_service.set(cache_key, data)

        return data

    # ==========================================================
    # CHART DATA
    # ==========================================================

    def get_chart_data(
        self,
        instrument_key: str,
        interval: str = "day",
    ):

        raw = self.get_historical_data(
            instrument_key=instrument_key,
            interval=interval,
        )

        candles = raw["data"]["candles"]

        chart = []

        for candle in candles:

            timestamp = candle[0]

            if interval == "day":

                time_value = timestamp[:10]

            else:

                # keep full datetime for intraday candles
                time_value = timestamp.replace("+05:30", "Z")

            chart.append({

                "time": time_value,

                "open": float(candle[1]),

                "high": float(candle[2]),

                "low": float(candle[3]),

                "close": float(candle[4]),

                "volume": float(candle[5]),

            })

        chart.sort(key=lambda x: x["time"])

        return chart

    # ==========================================================
    # LIVE QUOTES
    # ==========================================================

    def get_live_quotes(
        self,
        instrument_key: list[str],
    ):

        url = f"{self.BASE_URL}/market-quote/quotes"

        params = {
            "instrument_key": ",".join(instrument_key)
        }

        response = requests.get(
            url,
            headers=self.get_headers(),
            params=params,
            timeout=30,
        )

        print("=" * 80)
        print("STATUS :", response.status_code)
        print("RESPONSE :", response.text)
        print("=" * 80)

        response.raise_for_status()

        return response.json()

    # ==========================================================
    # DATAFRAME
    # ==========================================================

    def candles_to_dataframe(
        self,
        data: dict,
    ) -> pd.DataFrame:

        candles = data["data"]["candles"]

        df = pd.DataFrame(

            candles,

            columns=[
                "Date",
                "Open",
                "High",
                "Low",
                "Close",
                "Volume",
                "OpenInterest",
            ],
        )

        df["Date"] = pd.to_datetime(df["Date"])

        df = df.sort_values("Date").reset_index(drop=True)

        return df[
            [
                "Date",
                "Open",
                "High",
                "Low",
                "Close",
                "Volume",
            ]
        ]


market_service = MarketService()