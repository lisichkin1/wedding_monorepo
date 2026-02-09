from dotenv import load_dotenv
import os

load_dotenv()

class Settings:
    BOT_TOKEN: str = os.getenv("BOT_TOKEN", "")
    BACKEND_URL: str = os.getenv("BACKEND_URL")
    BOT_API_KEY: str = os.getenv("BOT_API_KEY", "")

    if not BOT_TOKEN:
        raise ValueError("BOT_TOKEN не указан в .env файле")

settings = Settings() 