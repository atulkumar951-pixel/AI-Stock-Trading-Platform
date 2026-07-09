from fastapi import APIRouter
from sqlalchemy import func

from app.database.database import SessionLocal
from app.database.models import PredictionHistory

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)


@router.get("/")
def analytics():

    db = SessionLocal()

    try:

        total = db.query(PredictionHistory).count()

        buy = db.query(PredictionHistory)\
            .filter(PredictionHistory.signal == "BUY")\
            .count()

        sell = db.query(PredictionHistory)\
            .filter(PredictionHistory.signal == "SELL")\
            .count()

        hold = db.query(PredictionHistory)\
            .filter(PredictionHistory.signal == "HOLD")\
            .count()

        avg_confidence = db.query(
            func.avg(PredictionHistory.confidence)
        ).scalar()

        return {

            "total_predictions": total,

            "buy_signals": buy,

            "sell_signals": sell,

            "hold_signals": hold,

            "average_confidence": round(
                avg_confidence or 0,
                2
            )

        }

    finally:

        db.close()