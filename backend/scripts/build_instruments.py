import json
from pathlib import Path

import pandas as pd

URLS = [
    "https://assets.upstox.com/market-quote/instruments/exchange/NSE.json.gz",
    "https://assets.upstox.com/market-quote/instruments/exchange/BSE.json.gz",
]

records = []

for url in URLS:

    print("=" * 80)
    print("Downloading:", url)
    print("=" * 80)

    df = pd.read_json(
        url,
        compression="gzip"
    )

    print("Downloaded:", len(df))

    exchange_name = url.split("/")[-1].replace(".json.gz", "")

    if exchange_name == "NSE":

        df = df[
            df["segment"].isin([
                "NSE_EQ",
                "NSE_INDEX",
            ])
        ]

    else:

        df = df[
            df["segment"].isin([
                "BSE_EQ",
                "BSE_INDEX",
            ])
        ]

    print("Filtered:", len(df))

    for _, row in df.iterrows():

        symbol = str(row["trading_symbol"]).strip()

        if not symbol:
            continue

        records.append({

            "symbol": symbol,

            "name": str(row["name"]).strip(),

            "exchange": row["segment"],

            "instrument_key": row["instrument_key"]

        })

print("=" * 80)

print("Total Instruments:", len(records))

records.sort(key=lambda x: x["symbol"])

output = (
    Path(__file__).parent.parent
    / "app"
    / "data"
    / "instruments"
    / "instruments.json"
)

with open(output, "w", encoding="utf-8") as f:

    json.dump(
        records,
        f,
        indent=4,
        ensure_ascii=False
    )

print("=" * 80)
print("Saved:", len(records))
print(output)
print("=" * 80)