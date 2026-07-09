from pydantic import BaseModel


class PredictionRequest(BaseModel):

    Open: float
    High: float
    Low: float
    Close: float
    Volume: float


class PredictionResponse(BaseModel):

    signal: str
    confidence: float
    target_price: float
    stop_loss: float
    expected_return: float