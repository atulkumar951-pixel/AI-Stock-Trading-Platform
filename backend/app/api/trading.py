from fastapi import APIRouter

from app.database.database import SessionLocal
from app.database.models import PredictionHistory

router = APIRouter(
    prefix="/trading",
    tags=["Trading"]
)


@router.get("/stocks")
def get_trading_stocks():

    db = SessionLocal()

    try:

        latest = (
            db.query(PredictionHistory)
            .order_by(
                PredictionHistory.created_at.desc()
            )
            .all()
        )

        stocks = []
        seen = set()

        for row in latest:

            if row.symbol in seen:
                continue

            seen.add(row.symbol)

            stocks.append({

                "symbol": row.symbol,

                "price": row.entry_price,

                "signal": row.signal,

                "confidence": row.confidence,

                "target": row.target_price,

                "stop_loss": row.stop_loss,

                "expected_return": row.expected_return,

                "ai_score": round(
                    row.confidence * 1.2,
                    2
                )

            })

        return stocks

    finally:

        db.close()