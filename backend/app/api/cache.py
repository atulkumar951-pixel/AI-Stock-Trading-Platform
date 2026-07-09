from fastapi import APIRouter

from app.services.cache_service import cache_service

router = APIRouter(
    prefix="/cache",
    tags=["Cache"]
)


@router.get("/")
def cache_status():

    return {

        "cached_symbols": list(cache_service.cache.keys()),

        "cache_size": len(cache_service.cache),

        "expiry_seconds": cache_service.expiry

    }


@router.delete("/")
def clear_cache():

    cache_service.clear()

    return {

        "message": "Cache cleared"

    }