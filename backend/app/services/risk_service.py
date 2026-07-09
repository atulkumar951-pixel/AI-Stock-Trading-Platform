class RiskService:

    @staticmethod
    def calculate(signal: str, close: float, atr: float):

        if signal == "BUY":

            target = close + atr * 2
            stop = close - atr

        elif signal == "SELL":

            target = close - atr * 2
            stop = close + atr

        else:

            target = close
            stop = close

        reward = abs(target - close)

        risk = abs(close - stop)

        expected_return = round(
            reward / close * 100,
            2
        )

        risk_reward = round(
            reward / risk,
            2
        ) if risk else 0

        return {

            "target": round(target, 2),

            "stop": round(stop, 2),

            "expected_return": expected_return,

            "risk_reward": risk_reward

        }


risk_service = RiskService()