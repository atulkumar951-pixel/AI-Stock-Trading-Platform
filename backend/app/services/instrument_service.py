import json
from pathlib import Path


class InstrumentService:

    def __init__(self):
        self.instruments = []

    def load(self):

        path = (
            Path(__file__)
            .parent.parent
            / "data"
            / "instruments"
            / "instruments.json"
        )

        with open(path, "r", encoding="utf-8") as f:
            self.instruments = json.load(f)

        print(
            f"Loaded {len(self.instruments)} instruments."
        )

    def search(
        self,
        query: str,
        limit: int = 20,
    ):

        query = query.upper()

        result = []

        for item in self.instruments:

            symbol = item.get("symbol", "").upper()

            name = item.get("name", "").upper()

            if (
                query in symbol
                or query in name
            ):

                result.append(item)

            if len(result) >= limit:
                break

        return result

    def get(
        self,
        instrument_key: str,
    ):

        for item in self.instruments:

            if (
                item["instrument_key"]
                == instrument_key
            ):
                return item

        return None


instrument_service = InstrumentService()