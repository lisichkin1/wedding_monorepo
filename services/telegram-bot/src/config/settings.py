from dotenv import load_dotenv
import os

load_dotenv()

class Settings:
    BOT_TOKEN: str = os.getenv("BOT_TOKEN", "")
    BACKEND_URL: str = os.getenv("BACKEND_URL")
    BOT_API_KEY: str = os.getenv("BOT_API_KEY", "")
    ALLOWED_USER_IDS: list[int] = (
        [int(x.strip()) for x in os.getenv('ALLOWED_USER_IDS', '').split(',') if x.strip()]
        if os.getenv('ALLOWED_USER_IDS')
        else []
    )
    

    BOT_OWNER_ID: int | None = int(os.getenv('BOT_OWNER_ID')) if os.getenv('BOT_OWNER_ID') else None

    if not BOT_TOKEN:
        raise ValueError("BOT_TOKEN не указан в .env файле")

settings = Settings() 