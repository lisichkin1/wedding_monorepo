# В начале файла с хендлерами
GUEST_STATUS_MAP = {
    "": {"emoji": "❓", "text": "Не ответил", "color": "gray"},
    "attending": {"emoji": "✅", "text": "Приду", "color": "success"},
    "declined": {"emoji": "❌", "text": "Не смогу", "color": "error"},
    "pending": {"emoji": "⏳", "text": "Сообщу позже", "color": "warning"},
}

def get_status_display(confirmed: str) -> dict:
    return GUEST_STATUS_MAP.get(confirmed, GUEST_STATUS_MAP[""])