from fastapi import APIRouter

from app.services.market_service import market_service

router = APIRouter(
    prefix="/quote",
    tags=["Quote"]
)


@router.get("/{instrument_key:path}")
def get_quote(instrument_key: str):
    """
    Returns latest market quote for any stock or index.
    """
    print("Instrument Key:", instrument_key)
    return market_service.get_quote(instrument_key)
