class VolatilityService:

    @staticmethod
    def classify(atr_pct: float):

        if atr_pct < 0.01:

            return "Low"

        elif atr_pct < 0.02:

            return "Medium"

        else:

            return "High"


volatility_service = VolatilityService()