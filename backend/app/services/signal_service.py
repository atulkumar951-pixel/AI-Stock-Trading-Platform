class SignalService:

    @staticmethod
    def strength(confidence):

        if confidence >= 90:

            return "Excellent"

        elif confidence >= 80:

            return "Very Strong"

        elif confidence >= 70:

            return "Strong"

        elif confidence >= 60:

            return "Moderate"

        else:

            return "Weak"


signal_service = SignalService()