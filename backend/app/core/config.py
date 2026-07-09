from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

# Project root: backend/
BASE_DIR = Path(__file__).resolve().parents[2]


class Settings(BaseSettings):

    APP_NAME: str
    APP_VERSION: str
    DEBUG: bool

    HOST: str
    PORT: int

    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    MODEL_PATH: str
    FEATURES_PATH: str
    LABEL_PATH: str

    model_config = SettingsConfigDict(
        env_file=BASE_DIR / ".env",
        extra="ignore",
    )
    
    UPSTOX_API_KEY: str
    UPSTOX_API_SECRET: str
    UPSTOX_REDIRECT_URI: str
    UPSTOX_ACCESS_TOKEN: str = ""


settings = Settings()