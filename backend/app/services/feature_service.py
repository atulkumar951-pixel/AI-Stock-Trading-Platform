import pandas as pd

from app.ml.model_loader import model_loader


class FeatureService:

    @staticmethod
    def validate(df: pd.DataFrame) -> pd.DataFrame:
        """
        Validate feature order and names before prediction.
        """

        expected = model_loader.features

        missing = [c for c in expected if c not in df.columns]

        if missing:
            raise ValueError(
                f"Missing Features : {missing}"
            )

        # Keep only training features
        df = df[expected]

        return df


feature_service = FeatureService()