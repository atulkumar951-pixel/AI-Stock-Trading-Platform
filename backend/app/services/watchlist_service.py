from app.database.watchlist import get_connection


class WatchlistService:

    # ============================================
    # GET ALL
    # ============================================

    def get_all(self):

        conn = get_connection()

        cursor = conn.cursor()

        cursor.execute(
            """
            SELECT *
            FROM watchlist
            ORDER BY created_at DESC
            """
        )

        rows = cursor.fetchall()

        conn.close()

        return [dict(row) for row in rows]

    # ============================================
    # ADD
    # ============================================

    def add(self, item: dict):

        conn = get_connection()

        cursor = conn.cursor()

        cursor.execute(
            """
            INSERT OR IGNORE INTO watchlist
            (
                symbol,
                name,
                exchange,
                instrument_key
            )
            VALUES
            (
                ?, ?, ?, ?
            )
            """,
            (
                item["symbol"],
                item["name"],
                item["exchange"],
                item["instrument_key"],
            ),
        )

        conn.commit()

        conn.close()

        return {
            "success": True
        }

    # ============================================
    # DELETE
    # ============================================

    def remove(
        self,
        instrument_key: str,
    ):

        conn = get_connection()

        cursor = conn.cursor()

        cursor.execute(
            """
            DELETE FROM watchlist
            WHERE instrument_key = ?
            """,
            (
                instrument_key,
            ),
        )

        conn.commit()

        conn.close()

        return {
            "success": True
        }

    # ============================================
    # EXISTS
    # ============================================

    def exists(
        self,
        instrument_key: str,
    ):

        conn = get_connection()

        cursor = conn.cursor()

        cursor.execute(
            """
            SELECT 1
            FROM watchlist
            WHERE instrument_key = ?
            """,
            (
                instrument_key,
            ),
        )

        row = cursor.fetchone()

        conn.close()

        return row is not None


watchlist_service = WatchlistService()