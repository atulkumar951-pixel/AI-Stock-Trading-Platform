from fastapi import APIRouter

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.get("/callback")
def callback(code: str):

    return {
        "authorization_code": code
    }