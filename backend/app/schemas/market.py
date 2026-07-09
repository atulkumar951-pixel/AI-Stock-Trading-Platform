from pydantic import BaseModel


class MarketRequest(BaseModel):
    symbol: str
    interval: str = "1day"
    candles: int = 250