from app.services.watchlist_service import watchlist_service

watchlist_service.add(
    {
        "symbol": "RELIANCE",
        "name": "Reliance Industries Ltd",
        "exchange": "NSE_EQ",
        "instrument_key": "NSE_EQ|INE002A01018",
    }
)

print(watchlist_service.get_all())

print(
    watchlist_service.exists(
        "NSE_EQ|INE002A01018"
    )
)

watchlist_service.remove(
    "NSE_EQ|INE002A01018"
)

print(watchlist_service.get_all())