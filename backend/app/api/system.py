import platform
import time

from fastapi import APIRouter

router = APIRouter(
    prefix="/system",
    tags=["System"]
)

START_TIME = time.time()


@router.get("/")
def system():

    return {

        "status": "Running",

        "python": platform.python_version(),

        "uptime_seconds": round(
            time.time() - START_TIME,
            2
        )

    }