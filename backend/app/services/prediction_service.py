import numpy as np
import pandas as pd


from app.services.company_service import company_service
from app.services.volatility_service import volatility_service
from app.services.signal_service import signal_service

from app.ml.model_loader import model_loader
from app.ml.feature_engineering import create_live_features

from app.services.feature_service import feature_service
from app.services.market_service import market_service
from app.services.analysis_service import analysis_service
from app.services.risk_service import risk_service
from app.services.ai_score_service import ai_score_service

from app.database.database import SessionLocal
from app.database.models import PredictionHistory
from app.services.instrument_service import instrument_service

class PredictionService:

    @staticmethod
    def predict_live(instrument_key: str):
        """
        Download live market data and generate prediction.
        """
        instrument = instrument_service.get(instrument_key)
        if instrument is None:
            raise Exception(f"Instrument not found")
        
        symbol = instrument["symbol"]

        raw = market_service.get_historical_data(instrument_key)

        df = market_service.candles_to_dataframe(raw)

        df = create_live_features(df)

        return PredictionService.predict(df=df, symbol=symbol)

    @staticmethod
    def predict(df: pd.DataFrame, symbol: str):
        """
        Predict BUY / SELL / HOLD from prepared dataframe.
        """

        # -------------------------------
        # Validate Features
        # -------------------------------

        validated_df = feature_service.validate(df)

        # Use latest candle only for prediction
        model_df = validated_df.tail(1).copy()

        # Latest market candle (contains ATR, RSI etc.)
        latest = df.iloc[-1]

        # -------------------------------
        # Prediction
        # -------------------------------

        prediction = model_loader.model.predict(model_df)

        if isinstance(prediction, np.ndarray):
            prediction = prediction.flatten()[0]

        prediction = int(prediction)

        signal = model_loader.label_decoder[prediction]

        # -------------------------------
        # Confidence
        # -------------------------------

        probability = model_loader.model.predict_proba(model_df)[0]

        confidence = round(
            float(np.max(probability) * 100),
            2
        )

        # -------------------------------
        # Market Data
        # -------------------------------

        close = float(latest["Close"])

        # -------------------------------
        # Technical Analysis
        # -------------------------------

        analysis = analysis_service.analyze(df)

        company = company_service.get(symbol)

        volatility = volatility_service.classify(
            analysis["atr"] / close
        )

        strength = signal_service.strength(
            confidence
        )

        # -------------------------------
        # Risk Calculation
        # -------------------------------

        risk = risk_service.calculate(
            signal=signal,
            close=close,
            atr=analysis["atr"]
        )

        # -------------------------------
        # AI Score
        # -------------------------------

        ai = ai_score_service.calculate(
            signal=signal,
            confidence=confidence,
            analysis=analysis
        )

        # -------------------------------
        # Save Prediction
        # -------------------------------

        db = SessionLocal()

        try:

            prediction_row = PredictionHistory(
                symbol=symbol,
                signal=signal,
                confidence=float(confidence),
                entry_price=float(round(close, 2)),
                target_price=float(risk["target"]),
                stop_loss=float(risk["stop"]),
                expected_return=float(risk["expected_return"]),
            )

            db.add(prediction_row)
            db.commit()

        finally:

            db.close()

        # -------------------------------
        # API Response
        # -------------------------------

        return {

            "company": {

                "symbol": symbol,

                "name": company["name"],

                "sector": company["sector"],

                "exchange": company["exchange"]
            },

            "prediction": {

                "signal": signal,

                "confidence": confidence,

                "ai_score": ai["ai_score"],

                "recommendation": ai["recommendation"],

                "strength": strength

            },

            "market": {

                "entry_price": round(close, 2),

                "trend": analysis["trend"],

                "rsi": analysis["rsi"],

                "rsi_status": analysis["rsi_status"],

                "macd": analysis["macd"],

                "atr": analysis["atr"],

                "volatility": volatility,

                "bollinger_position": analysis["bollinger_position"]

            },

            "risk": {
                "target_price": float(risk["target"]),
                "stop_loss": float(risk["stop"]),
                "expected_return": float(risk["expected_return"]),
                "risk_reward": float(risk["risk_reward"]),
            }

        }


prediction_service = PredictionService()