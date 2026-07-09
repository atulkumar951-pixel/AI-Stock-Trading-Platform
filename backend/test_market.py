from app.services.market_service import market_service
from app.utils.instruments import INSTRUMENTS

data = market_service.get_historical_data(
    INSTRUMENTS["INFY"]
)

print(type(data))

if isinstance(data, dict):
    print(data.keys())

    if "status" in data:
        print("Status:", data["status"])

    if "errors" in data:
        print("Errors:", data["errors"])

    if "data" in data:
        print("Data Keys:", data["data"].keys())