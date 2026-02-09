import requests
from requests.exceptions import RequestException
from src.config.settings import settings
from src.utils.logger import logger


class BackendService:
    def __init__(self, base_url: str):
        self.base_url = base_url.rstrip('/')
        self.timeout = 10
        self.headers = {
            'Content-Type': 'application/json',
            'X-API-Key': settings.BOT_API_KEY
        }

    def create_guest(self, name: str) -> dict | None:
        try:
            response = requests.post(
                f"{self.base_url}/api/guests",
                json={"name": name.strip()},
                headers=self.headers,
                timeout=self.timeout
            )
            response.raise_for_status()
            return response.json()
            
        except RequestException as e:
            logger.error(f"Ошибка создания гостя: {e}")
            if hasattr(e, 'response') and e.response is not None:
                try:
                    return e.response.json()
                except ValueError:
                    return {"success": False, "error": f"Ошибка сервера: {e}"}
            return {"success": False, "error": "Не удалось подключиться к серверу"}
    
    def get_guests(self) -> dict | None:
        try:
            response = requests.get(
                f"{self.base_url}/api/guests",
                timeout=self.timeout
            )
            response.raise_for_status()
            return response.json()
        except RequestException as e:
            logger.error(f"Ошибка получения списка гостей: {e}")
            return None