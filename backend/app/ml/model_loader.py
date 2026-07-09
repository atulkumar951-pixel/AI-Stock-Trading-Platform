import os
import joblib
from catboost import CatBoostClassifier

from app.core.config import settings


class ModelLoader:
    def __init__(self):
        self.model = None
        self.features = None
        self.label_decoder = None

    def load(self):
        # Verify files exist
        for path in [
            settings.MODEL_PATH,
            settings.FEATURES_PATH,
            settings.LABEL_PATH,
        ]:
            if not os.path.exists(path):
                raise FileNotFoundError(f"Missing file: {path}")

        # Load CatBoost model
        self.model = CatBoostClassifier()
        self.model.load_model(settings.MODEL_PATH)

        # Load feature list
        self.features = joblib.load(settings.FEATURES_PATH)

        # Load label decoder
        self.label_decoder = joblib.load(settings.LABEL_PATH)

        print("=" * 60)
        print("✅ AI Model Loaded")
        print(f"Features Loaded : {len(self.features)}")
        print("=" * 60)


model_loader = ModelLoader()