from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Float
from sqlalchemy import String
from sqlalchemy import DateTime

from datetime import datetime

from app.database.database import Base


class PredictionHistory(Base):

    __tablename__ = "prediction_history"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    symbol = Column(String)

    signal = Column(String)

    confidence = Column(Float)

    entry_price = Column(Float)

    target_price = Column(Float)

    stop_loss = Column(Float)

    expected_return = Column(Float)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )


class ApiToken(Base):

    __tablename__ = "api_tokens"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    access_token = Column(
        String,
        nullable=False
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )