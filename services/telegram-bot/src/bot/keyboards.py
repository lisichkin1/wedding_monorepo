from aiogram.types import ReplyKeyboardMarkup, KeyboardButton, InlineKeyboardMarkup
from aiogram.utils.keyboard import InlineKeyboardBuilder


# Главное меню
def get_main_menu() -> ReplyKeyboardMarkup:
    return ReplyKeyboardMarkup(
        keyboard=[
            [KeyboardButton(text="📊 Управление")],
            [KeyboardButton(text="⚙️ Настройки")],
            [KeyboardButton(text="ℹ️ Помощь")],
        ],
        resize_keyboard=True,
        one_time_keyboard=False,
    )


# Меню "Управление"
def get_management_menu() -> ReplyKeyboardMarkup:
    return ReplyKeyboardMarkup(
        keyboard=[
            [KeyboardButton(text="➕️ Добавить гостя")],
            [KeyboardButton(text="🗑️ Удалить гостя")],
            [KeyboardButton(text="📋 Список гостей")],
            [KeyboardButton(text="⬅️ Назад")]
        ],
        resize_keyboard=True,
        one_time_keyboard=False,
    )


# Инлайн-кнопки под сообщением
def get_stats_inline():
    builder = InlineKeyboardBuilder()
    builder.button(text="🔄 Обновить", callback_data="refresh_stats")
    builder.button(text="🏠 В меню", callback_data="back_to_menu")
    builder.adjust(2)  # 2 кнопки в ряд
    return builder.as_markup()


def get_guest_type_keyboard() -> InlineKeyboardMarkup:
    """Инлайн-клавиатура для выбора типа гостя"""
    builder = InlineKeyboardBuilder()
    builder.button(text="👨 Мужчина", callback_data="guest_type:male")
    builder.button(text="👩 Женщина", callback_data="guest_type:female")
    builder.button(text="👥 Группа", callback_data="guest_type:group")
    builder.button(text="❌ Отмена", callback_data="guest_type:cancel")
    builder.adjust(2, 1)  # 2 кнопки в первой строке, отмена — отдельно
    return builder.as_markup()