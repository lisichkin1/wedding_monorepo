from typing import Callable, Dict, Any, Awaitable
from aiogram import BaseMiddleware
from aiogram.types import Message, CallbackQuery, TelegramObject
from src.config.settings import settings
from src.utils.logger import logger


class AuthMiddleware(BaseMiddleware):
    async def __call__(
        self,
        handler: Callable[[TelegramObject, Dict[str, Any]], Awaitable[Any]],
        event: TelegramObject,
        data: Dict[str, Any]
    ) -> Any:

        user = None
        if isinstance(event, Message):
            user = event.from_user
        elif isinstance(event, CallbackQuery):
            user = event.from_user

        if not user:
            logger.warning("❌ Не удалось определить пользователя")
            return

        is_allowed = (
            user.id in settings.ALLOWED_USER_IDS or
            (settings.BOT_OWNER_ID and user.id == settings.BOT_OWNER_ID)
        )

        if not is_allowed:
            logger.warning(
                f"🚫 Доступ запрещён для {user.id} (@{user.username or 'N/A'})"
            )

            if isinstance(event, Message):
                await event.answer(
                    "🔐 <b>Доступ закрыт</b>\n\n"
                    "Этот бот доступен только авторизованным пользователям.\n"
                    "Обратитесь к администратору для получения доступа.",
                    parse_mode="HTML"
                )
            elif isinstance(event, CallbackQuery):
                await event.answer(
                    "Доступ запрещён",
                    show_alert=True
                )

            return

        logger.info(
            f"✅ Доступ разрешён для {user.id} (@{user.username or 'N/A'})"
        )

        return await handler(event, data)
