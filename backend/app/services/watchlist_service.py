from sqlalchemy.exc import IntegrityError

from app.database.database import SessionLocal
from app.database.models import Watchlist


class WatchlistService:

    # ============================================
    # GET ALL
    # ============================================

    def get_all(self):

        db = SessionLocal()

        try:

            items = (
                db.query(Watchlist)
                .order_by(Watchlist.created_at.desc())
                .all()
            )

            return [

                {
                    "id": item.id,
                    "symbol": item.symbol,
                    "name": item.name,
                    "exchange": item.exchange,
                    "instrument_key": item.instrument_key,
                    "created_at": item.created_at,
                }

                for item in items

            ]

        finally:

            db.close()

    # ============================================
    # ADD
    # ============================================

    def add(self, item: dict):

        db = SessionLocal()

        try:

            exists = (
                db.query(Watchlist)
                .filter(
                    Watchlist.instrument_key ==
                    item["instrument_key"]
                )
                .first()
            )

            if exists:

                return {
                    "success": True,
                    "message": "Already exists"
                }

            row = Watchlist(

                symbol=item["symbol"],

                name=item["name"],

                exchange=item["exchange"],

                instrument_key=item["instrument_key"]

            )

            db.add(row)

            db.commit()

            return {
                "success": True
            }

        except IntegrityError:

            db.rollback()

            return {
                "success": True
            }

        finally:

            db.close()

    # ============================================
    # DELETE
    # ============================================

    def remove(
        self,
        instrument_key: str,
    ):

        db = SessionLocal()

        try:

            row = (
                db.query(Watchlist)
                .filter(
                    Watchlist.instrument_key ==
                    instrument_key
                )
                .first()
            )

            if row:

                db.delete(row)

                db.commit()

            return {
                "success": True
            }

        finally:

            db.close()

    # ============================================
    # EXISTS
    # ============================================

    def exists(
        self,
        instrument_key: str,
    ):

        db = SessionLocal()

        try:

            return (

                db.query(Watchlist)

                .filter(
                    Watchlist.instrument_key ==
                    instrument_key
                )

                .first()

                is not None

            )

        finally:

            db.close()


watchlist_service = WatchlistService()