from aiogram import Router, F
from aiogram.types import Message, CallbackQuery
from aiogram.filters import Command
from src.bot.keyboards import get_main_menu, get_stats_inline, get_management_menu
from src.services.backend import BackendService
from src.config.settings import settings
from src.utils.logger import logger

router = Router()
backend = BackendService(settings.BACKEND_URL)

# Команда /start
@router.message(Command("start"))
async def cmd_start(message: Message):
    user = message.from_user
    logger.info(f"Пользователь {user.id} (@{user.username}) запустил бота")
    
    await message.answer(
        f"👋 Привет, {user.first_name}!\n\n"
        "Я бот с меню и подключением к бэкенду.\n"
        "Выберите действие:",
        reply_markup=get_main_menu()
    )

# Кнопка "Статистика"
@router.message(F.text == "📊 Управление")
async def handle_management(message: Message):
    await message.answer(
        "🛠️ <b>Меню управления</b>\n\nВыберите действие:",
        parse_mode="HTML",
        reply_markup=get_management_menu()  # Показываем подменю
    )

# Кнопка "Назад"
@router.message(F.text == "⬅️ Назад")
async def handle_back(message: Message):
    await message.answer(
        "🏠 <b>Главное меню</b>",
        parse_mode="HTML",
        reply_markup=get_main_menu()
    )

@router.message(F.text == "➕️ Добавить гостя")
async def handle_add_guest(message: Message):
    await message.answer("⏳ Добавляю гостя...")
    
    stats = backend.get_stats()
    
    if stats and stats.get("success"):
        data = stats.get("data", {})
        text = (
            "📊 <b>Статистика</b>\n\n"
            f"👥 Пользователей: {data.get('users', 0)}\n"
            f"📈 Активность: {data.get('activity', 0)}%"
        )
        await message.answer(text, reply_markup=get_stats_inline(), parse_mode="HTML")
    else:
        await message.answer("❌ Не удалось загрузить статистику", reply_markup=get_management_menu())


# Кнопка "Настройки"
@router.message(F.text == "⚙️ Настройки")
async def handle_settings(message: Message):
    await message.answer(
        "⚙️ <b>Настройки</b>\n\n"
        "Пока здесь ничего нет. Скоро добавим!",
        parse_mode="HTML",
        reply_markup=get_main_menu()
    )

# Кнопка "Помощь"
@router.message(F.text == "ℹ️ Помощь")
async def handle_help(message: Message):
    await message.answer(
        "ℹ️ <b>Помощь</b>\n\n"
        "Доступные команды:\n"
        "/start — главное меню\n"
        "/help — эта справка",
        parse_mode="HTML",
        reply_markup=get_main_menu()
    )

# Инлайн-кнопки
@router.callback_query(F.data == "refresh_stats")
async def refresh_stats(callback: CallbackQuery):
    await callback.answer("🔄 Обновляю...")
    # Здесь можно повторно запросить статистику
    await callback.message.edit_text(
        "✅ Статистика обновлена!",
        reply_markup=get_stats_inline()
    )

@router.callback_query(F.data == "back_to_menu")
async def back_to_menu(callback: CallbackQuery):
    await callback.answer()
    await callback.message.edit_text(
        "🏠 Главное меню",
        reply_markup=get_main_menu()
    )

# Обработка неизвестных сообщений
@router.message()
async def unknown_message(message: Message):
    await message.answer(
        "❓ Неизвестная команда.\nИспользуйте меню или /start",
        reply_markup=get_main_menu()
    )