from fastapi import FastAPI
from app.core.config import settings
from app.core.logger import logger

from fastapi.middleware.cors import CORSMiddleware
from app.api.market import router as market_router

from app.ml.model_loader import model_loader
from app.api.cache import router as cache_router
from app.api.system import router as system_router
from app.api.watchlist import router as watchlist_router

from app.database.session import create_database
from app.api.dashboard import router as dashboard_router

from app.api.history import router as history_router
from app.api.analytics import router as analytics_router

from app.api.prediction import router as prediction_router
from app.routers.health import router as health_router
from app.auth.login import router as auth_router
from app.api.trading import router as trading_router
from app.services.instrument_service import instrument_service
from app.api.search import router as search_router
from app.api.live_prediction import router as live_prediction_router
from app.api.quote import router as quote_router
from app.api.chart import router as chart_router
from app.database.watchlist import create_watchlist_table


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    debug=settings.DEBUG
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://ai-stock-trading-platform-seven.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(health_router)
app.include_router(auth_router)
app.include_router(prediction_router)
app.include_router(history_router)
app.include_router(analytics_router)
app.include_router(dashboard_router)
app.include_router(watchlist_router)
app.include_router(cache_router)
app.include_router(system_router)
app.include_router(market_router)
app.include_router(trading_router)
app.include_router(search_router)
app.include_router(live_prediction_router)
app.include_router(quote_router)
app.include_router(chart_router)



@app.on_event("startup")
async def startup():

    create_database()

    model_loader.load()
    instrument_service.load()
    create_watchlist_table()
    logger.info("AI Ready")


@app.get("/")
def root():

    return {
        "application": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "Running"
    }