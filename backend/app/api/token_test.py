from fastapi import APIRouter
import requests

from app.core.config import settings

router = APIRouter(prefix="/test", tags=["Test"])


@router.get("/token")
def test_token():

    r = requests.get(
        "https://api.upstox.com/v2/user/profile",
        headers={
            "Accept": "application/json",
            "Authorization": f"Bearer {settings.UPSTOX_ACCESS_TOKEN}",
        },
    )

    return {
        "status_code": r.status_code,
        "response": r.json(),
    }