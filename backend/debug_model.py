import joblib
import pandas as pd

from app.ml.model_loader import model_loader
from app.services.market_service import market_service
from app.ml.feature_engineering import create_live_features
from app.services.feature_service import feature_service
from app.utils.instruments import INSTRUMENTS

# Load model
model_loader.load()

# Get live data
raw = market_service.get_historical_data(INSTRUMENTS["INFY"])

# Convert to DataFrame
df = market_service.candles_to_dataframe(raw)

# Generate features
df = create_live_features(df)

# Validate/order features
df = feature_service.validate(df)

print("DataFrame shape:", df.shape)
print("Model type:", type(model_loader.model))
print("Label decoder:", model_loader.label_decoder)

prediction = model_loader.model.predict(df)

print("Prediction:")
print(prediction)
print("Prediction type:", type(prediction))

try:
    print("Prediction shape:", prediction.shape)
except Exception:
    pass

prob = model_loader.model.predict_proba(df)

print("Probability:")
print(prob)
print("Probability type:", type(prob))