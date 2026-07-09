from app.database.database import SessionLocal
from app.database.models import ApiToken

class TokenService:

    @staticmethod
    def save_token(token: str):

        db = SessionLocal()

        try:

            db.query(ApiToken).delete()

            db.add(
                ApiToken(
                    access_token=token
                )
            )

            db.commit()

        finally:

            db.close()

    @staticmethod
    def get_token():

        db = SessionLocal()

        try:

            token = db.query(ApiToken).first()

            if token:

                return token.access_token

            return None

        finally:

            db.close()


token_service = TokenService()