import requests
from requests.exceptions import RequestException
from src.utils.logger import logger

class BackendService:
    def __init__(self, base_url: str):
        self.base_url = base_url.rstrip('/')
        self.timeout = 10
    
    def get_stats(self) -> dict | None:
        try:
            response = requests.get(
                f"{self.base_url}/stats",
                timeout=self.timeout
            )
            response.raise_for_status()
            return response.json()
        except RequestException as e:
            logger.error(f"Ошибка запроса к бэкенду: {e}")
            return None
    
    def send_user_action(self, user_id: int, action: str) -> bool:
        try:
            requests.post(
                f"{self.base_url}/actions",
                json={"user_id": user_id, "action": action},
                timeout=self.timeout
            )
            return True
        except RequestException as e:
            logger.error(f"Ошибка отправки действия: {e}")
            return False