from fastapi import APIRouter

from app.services.market_service import market_service

router = APIRouter(
    prefix="/chart",
    tags=["Chart"],
)


@router.get("/{instrument_key:path}")
def chart(
    instrument_key: str,
    interval: str = "day",
):
    return market_service.get_chart_data(
        instrument_key=instrument_key,
        interval=interval,
    )