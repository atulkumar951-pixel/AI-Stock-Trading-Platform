from fastapi import APIRouter

from app.services.market_service import market_service

router = APIRouter(
    prefix="/market",
    tags=["Market"],
)


@router.get("")
def market():

    keys = [

        "NSE_INDEX|Nifty 50",

        "NSE_INDEX|Nifty Bank",

        "NSE_INDEX|Nifty Midcap Select",

        "NSE_INDEX|Nifty Fin Service",

        "NSE_INDEX|India VIX",

        "NSE_INDEX|Nifty IT",

        "NSE_INDEX|Nifty Energy",

        "NSE_INDEX|Nifty FMCG",

        "NSE_INDEX|Nifty Auto",

        "BSE_INDEX|SENSEX",

        "BSE_INDEX|SENSEX50",

    ]

    quotes = market_service.get_live_quotes(keys)

    print(quotes["data"].keys())

    print("=" * 80)
    print(quotes)
    print("=" * 80)

    data = quotes["data"]

    markets = []

    for key, value in data.items():

        markets.append({

            "name": key.split(":")[-1].replace("|", ""),

            "price": value["last_price"],

            "change": value["net_change"],

            "open": value["ohlc"]["open"],

            "high": value["ohlc"]["high"],

            "low": value["ohlc"]["low"],

            "close": value["ohlc"]["close"],

        })

    return markets