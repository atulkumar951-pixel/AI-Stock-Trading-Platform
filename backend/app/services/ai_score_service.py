class AIScoreService:

    @staticmethod
    def calculate(
        signal: str,
        confidence: float,
        analysis: dict
    ):

        score = confidence

        # RSI Bonus

        if analysis["rsi_status"] == "Oversold" and signal == "BUY":
            score += 8

        elif analysis["rsi_status"] == "Overbought" and signal == "SELL":
            score += 8

        # Trend Bonus

        if analysis["trend"] == "Strong Bullish" and signal == "BUY":
            score += 10

        elif analysis["trend"] == "Strong Bearish" and signal == "SELL":
            score += 10

        # MACD Bonus

        if analysis["macd"] == "Bullish" and signal == "BUY":
            score += 6

        elif analysis["macd"] == "Bearish" and signal == "SELL":
            score += 6

        score = min(score, 100)

        # Recommendation

        if score >= 90:

            recommendation = "Very Strong Buy" if signal == "BUY" else "Very Strong Sell"

        elif score >= 80:

            recommendation = "Strong Buy" if signal == "BUY" else "Strong Sell"

        elif score >= 65:

            recommendation = signal.title()

        else:

            recommendation = "Hold"

        return {

            "ai_score": round(score, 2),

            "recommendation": recommendation

        }


ai_score_service = AIScoreService()