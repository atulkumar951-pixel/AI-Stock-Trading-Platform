from app.services.token_service import token_service
from app.core.config import settings


class TokenManager:

    def get_access_token(self):

        token = token_service.get_token()

        if token:
            return token

        if not settings.UPSTOX_ACCESS_TOKEN:
            raise Exception(
                "Upstox Access Token not configured."
            )

        return settings.UPSTOX_ACCESS_TOKEN


token_manager = TokenManager()