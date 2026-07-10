from fastapi import APIRouter
import requests

from app.core.config import settings

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.get("/callback")
def callback(code: str):

    response = requests.post(
        "https://api.upstox.com/v2/login/authorization/token",
        headers={
            "accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data={
            "code": code,
            "client_id": settings.UPSTOX_API_KEY,
            "client_secret": settings.UPSTOX_API_SECRET,
            "redirect_uri": settings.UPSTOX_REDIRECT_URI,
            "grant_type": "authorization_code",
        },
    )

    response.raise_for_status()

    token = response.json()["access_token"]

    return {
        "access_token": token
    }