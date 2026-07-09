from app.database.database import engine
from app.database.database import Base

import app.database.models


def create_database():

    Base.metadata.create_all(bind=engine)