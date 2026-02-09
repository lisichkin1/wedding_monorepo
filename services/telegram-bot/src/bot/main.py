import asyncio
import logging
from aiogram import Bot, Dispatcher
from aiogram.client.default import DefaultBotProperties  # ← НОВЫЙ ИМПОРТ
from aiogram.enums import ParseMode
from src.config.settings import settings
from src.bot.handlers import router
from src.utils.logger import logger

async def main():
    # Инициализация бота с новым синтаксисом
    bot = Bot(
        token=settings.BOT_TOKEN,
        default=DefaultBotProperties(parse_mode=ParseMode.HTML)  # ← ИСПРАВЛЕНО
    )
    dp = Dispatcher()
    
    # Подключаем роутеры
    dp.include_router(router)
    
    # Запуск поллинга
    logger.info("Бот запущен")
    await dp.start_polling(bot)

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        logger.info("Бот остановлен пользователем")
    except Exception as e:
        logger.error(f"Критическая ошибка: {e}")