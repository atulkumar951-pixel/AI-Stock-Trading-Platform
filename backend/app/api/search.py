from fastapi import APIRouter, Query

from app.services.instrument_service import instrument_service

router = APIRouter(
    prefix="/search",
    tags=["Search"],
)


@router.get("")
def search_stock(
    q: str = Query(..., min_length=1)
):

    return instrument_service.search(q)