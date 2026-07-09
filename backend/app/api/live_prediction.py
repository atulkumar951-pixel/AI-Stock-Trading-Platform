from fastapi import APIRouter
from pydantic import BaseModel

from app.services.prediction_service import prediction_service

router = APIRouter(
    prefix="/live",
    tags=["Live Prediction"]
)


class PredictionRequest(BaseModel):
    instrument_key: str


@router.post("/predict")
def live_predict(request: PredictionRequest):

    return prediction_service.predict_live(
        request.instrument_key
    )