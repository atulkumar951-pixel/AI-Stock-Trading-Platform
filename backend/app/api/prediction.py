
from fastapi import APIRouter

router = APIRouter(
    prefix="/predict",
    tags=["Prediction"]
)


@router.get("/{symbol}")
def predict(symbol: str):

    return {
        "message": "Use POST /live/predict for live AI prediction.",
        "symbol": symbol.upper()
    }
