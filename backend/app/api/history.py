from fastapi import APIRouter

from app.database.database import SessionLocal
from app.database.models import PredictionHistory

router = APIRouter(
    prefix="/history",
    tags=["History"]
)


@router.get("/")
def history(limit: int = 50):

    db = SessionLocal()

    try:

        data = (
            db.query(PredictionHistory)
            .order_by(PredictionHistory.id.desc())
            .limit(limit)
            .all()
        )

        return [
            {
                "id": row.id,
                "symbol": row.symbol,
                "signal": row.signal,
                "confidence": row.confidence,
                "entry_price": row.entry_price,
                "target_price": row.target_price,
                "stop_loss": row.stop_loss,
                "expected_return": row.expected_return,
                "created_at": row.created_at,
            }
            for row in data
        ]

    finally:

        db.close()