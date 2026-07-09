from pydantic import BaseModel


class WatchlistItem(BaseModel):

    symbol: str

    name: str

    exchange: str

    instrument_key: str