class AnalysisService:

    @staticmethod
    def analyze(df):

        row = df.iloc[-1]

        # RSI
        if row["RSI"] >= 70:
            rsi = "Overbought"

        elif row["RSI"] <= 30:
            rsi = "Oversold"

        else:
            rsi = "Neutral"

        # MACD

        macd = (
            "Bullish"
            if row["MACD"] > row["MACD_Signal"]
            else "Bearish"
        )

        # EMA Trend

        if row["EMA_5"] > row["EMA_21"] > row["EMA_50"]:

            trend = "Strong Bullish"

        elif row["EMA_5"] < row["EMA_21"] < row["EMA_50"]:

            trend = "Strong Bearish"

        else:

            trend = "Sideways"

        return {

            "rsi": round(row["RSI"], 2),

            "rsi_status": rsi,

            "macd": macd,

            "trend": trend,

            "atr": round(row["ATR"], 2),

            "bollinger_position": round(
                row["BB_Position"],
                2
            )

        }


analysis_service = AnalysisService()