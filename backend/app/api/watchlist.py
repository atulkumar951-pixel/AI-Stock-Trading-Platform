import time

from fastapi import APIRouter

from app.schemas.watchlist import WatchlistItem
from app.services.watchlist_service import watchlist_service
from app.services.market_service import market_service
from app.services.prediction_service import prediction_service
from app.utils.instruments import INSTRUMENTS

router = APIRouter(
    prefix="/watchlist",
    tags=["Watchlist"],
)

# ==========================================================
# AI WATCHLIST PREDICTIONS
# ==========================================================

@router.get("/")
def ai_watchlist():

    start = time.time()

    predictions = []

    for symbol, instrument_key in INSTRUMENTS.items():

        try:

            result = prediction_service.predict_live(
                symbol,
                instrument_key,
            )

            predictions.append(result)

        except Exception as e:

            predictions.append({

                "company": {
                    "symbol": symbol,
                },

                "error": str(e),

            })

    execution_time = round(
        time.time() - start,
        2,
    )

    return {

        "total_symbols": len(INSTRUMENTS),

        "successful_predictions": len(
            [
                x
                for x in predictions
                if "error" not in x
            ]
        ),

        "failed_predictions": len(
            [
                x
                for x in predictions
                if "error" in x
            ]
        ),

        "execution_time_seconds": execution_time,

        "predictions": predictions,

    }


# ==========================================================
# USER WATCHLIST
# ==========================================================

@router.get("/items")
def get_watchlist():

    return watchlist_service.get_all()


@router.post("/items")
def add_watchlist(
    item: WatchlistItem,
):

    return watchlist_service.add(
        item.model_dump()
    )


@router.delete("/items/{instrument_key:path}")
def remove_watchlist(
    instrument_key: str,
):

    return watchlist_service.remove(
        instrument_key
    )


@router.get("/items/{instrument_key:path}")
def exists(
    instrument_key: str,
):

    return {

        "exists": watchlist_service.exists(
            instrument_key
        )

    }


# ==========================================================
# LIVE WATCHLIST
# ==========================================================

@router.get("/live")
def live_watchlist():

    watchlist = watchlist_service.get_all()

    if len(watchlist) == 0:

        return []

    keys = [
        item["instrument_key"]
        for item in watchlist
    ]

    quotes = market_service.get_live_quotes(keys)

    quote_data = quotes["data"]

    result = []

    for item in watchlist:
        quote = None

        for value in quote_data.values():
            if (value.get("instrument_token") == item["instrument_key"]):
                quote = value
                break
        if quote is None:
            continue

        result.append({

            "symbol": item["symbol"],

            "name": item["name"],

            "exchange": item["exchange"],

            "instrument_key": item["instrument_key"],

            "price": quote["last_price"],

            "change": quote["net_change"],

            "open": quote["ohlc"]["open"],

            "high": quote["ohlc"]["high"],

            "low": quote["ohlc"]["low"],

            "close": quote["ohlc"]["close"],

        })

    return result