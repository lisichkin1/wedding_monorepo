from aiogram import Router, F
from aiogram.types import Message, CallbackQuery
from aiogram.filters import Command
from aiogram.fsm.context import FSMContext
from src.bot.keyboards import get_main_menu, get_stats_inline, get_management_menu
from src.services.backend import BackendService
from src.bot.states import GuestStates
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
        "Я бот для управления гостями на свадьбу.\n"
        "Выберите действие:",
        reply_markup=get_main_menu(),
    )


# Кнопка "Статистика"
@router.message(F.text == "📊 Управление")
async def handle_management(message: Message):
    await message.answer(
        "🛠️ <b>Меню управления</b>\n\nВыберите действие:",
        parse_mode="HTML",
        reply_markup=get_management_menu(),  # Показываем подменю
    )


# Кнопка "Назад"
@router.message(F.text == "⬅️ Назад")
async def handle_back(message: Message):
    await message.answer(
        "🏠 <b>Главное меню</b>", parse_mode="HTML", reply_markup=get_main_menu()
    )


@router.message(F.text == "➕️ Добавить гостя")
async def handle_add_guest(message: Message, state: FSMContext):
    """
    Начало процесса добавления гостя — запрашиваем имя
    """
    # Устанавливаем состояние ожидания имени
    await state.set_state(GuestStates.waiting_for_name)

    await message.answer(
        "👤 <b>Добавление гостя</b>\n\n"
        "Пожалуйста, введите <b>имя гостя</b>:\n\n"
        "💡 Например: <i>Иван Петров</i>\n"
        "❌ Чтобы отменить: нажмите /start",
        parse_mode="HTML",
    )


@router.message(GuestStates.waiting_for_name)
async def process_guest_name(message: Message, state: FSMContext):

    guest_name = message.text.strip()

    if not guest_name:
        await message.answer(
            "❌ <b>Ошибка</b>\n\n" "Имя не может быть пустым. Пожалуйста, введите имя:",
            parse_mode="HTML",
        )
        return

    if len(guest_name) > 100:
        await message.answer(
            "❌ <b>Ошибка</b>\n\n"
            "Имя слишком длинное (максимум 100 символов). Попробуйте ещё раз:",
            parse_mode="HTML",
        )
        return

    await message.answer("⏳ Создаю гостя...")

    try:
        result = backend.create_guest(guest_name)

        if result and result.get("success"):
            guest_data = result.get("data", {})
            confirm_link = guest_data.get("confirmLink", "")

            response_text = (
                f"✅ <b>Гость успешно добавлен!</b>\n\n"
                f"👤 <b>Имя:</b> {guest_data.get('name')}\n"
                f"🔗 <b>Ссылка для подтверждения:</b>\n"
                f"<code>{confirm_link}</code>\n\n"
            )

            await message.answer(
                response_text, parse_mode="HTML", reply_markup=get_management_menu()
            )

            # Логируем успешное создание
            logger.info(
                f"Гость '{guest_name}' успешно создан. Токен: {guest_data.get('token')}"
            )

            # Сбрасываем состояние
            await state.clear()

        else:
            error_msg = (
                result.get("error", "Неизвестная ошибка")
                if result
                else "Сервер недоступен"
            )

            await message.answer(
                f"❌ <b>Ошибка создания гостя</b>\n\n"
                f"{error_msg}\n\n"
                "Попробуйте ещё раз или обратитесь к администратору.",
                parse_mode="HTML",
                reply_markup=get_management_menu(),
            )

            # Логируем ошибку
            logger.error(f"Ошибка создания гостя '{guest_name}': {error_msg}")

            # Сбрасываем состояние
            await state.clear()

    except Exception as e:
        logger.error(f"Критическая ошибка при создании гостя: {e}")
        await message.answer(
            "❌ <b>Критическая ошибка</b>\n\n"
            "Не удалось создать гостя. Попробуйте позже.",
            parse_mode="HTML",
            reply_markup=get_management_menu(),
        )
        await state.clear()

@router.message(F.text == "🗑️ Удалить гостя")
async def handle_delete_guest(message: Message, state: FSMContext):
    """Начало процесса удаления гостя — запрашиваем токен"""
    await state.set_state(GuestStates.waiting_for_token)

    await message.answer(
        "🗑️ <b>Удаление гостя</b>\n\n"
        "Пожалуйста, введите <b>токен гостя</b>:\n\n"
        "💡 Токен можно найти в списке гостей или в сообщении при создании гостя.\n"
        "❌ Чтобы отменить: нажмите /start",
        parse_mode="HTML",
    )

@router.message(GuestStates.waiting_for_token)
async def process_guest_token(message: Message, state: FSMContext):
    """Обработка введённого токена и удаление гостя"""
    token = message.text.strip()

    # Валидация
    if not token:
        await message.answer(
            "❌ <b>Ошибка</b>\n\n"
            "Токен не может быть пустым. Пожалуйста, введите токен:",
            parse_mode="HTML",
        )
        return

    if len(token) < 10:
        await message.answer(
            "❌ <b>Ошибка</b>\n\n"
            "Токен слишком короткий. Проверьте правильность ввода:",
            parse_mode="HTML",
        )
        return

    await message.answer("⏳ Удаляю гостя...")

    try:
        result = backend.delete_guest(token)

        if result and result.get("success"):
            guest_data = result.get("data", {})
            
            response_text = (
                f"✅ <b>Гость удалён!</b>\n\n"
                f"👤 <b>Имя:</b> {guest_data.get('name')}\n"
                f"🔑 <b>Токен:</b> <code>{guest_data.get('token')}</code>\n\n"
                f"Гость успешно удалён из списка."
            )

            await message.answer(
                response_text, parse_mode="HTML", reply_markup=get_management_menu()
            )

            logger.info(f"Гость '{guest_data.get('name')}' удалён")
            await state.clear()

        else:
            error_msg = (
                result.get("error", "Неизвестная ошибка")
                if result
                else "Сервер недоступен"
            )

            await message.answer(
                f"❌ <b>Ошибка удаления гостя</b>\n\n"
                f"{error_msg}\n\n"
                "Попробуйте ещё раз или проверьте токен.",
                parse_mode="HTML",
                reply_markup=get_management_menu(),
            )

            logger.error(f"Ошибка удаления гостя с токеном '{token}': {error_msg}")
            await state.clear()

    except Exception as e:
        logger.error(f"Критическая ошибка при удалении гостя: {e}")
        await message.answer(
            "❌ <b>Критическая ошибка</b>\n\n"
            "Не удалось удалить гостя. Попробуйте позже.",
            parse_mode="HTML",
            reply_markup=get_management_menu(),
        )
        await state.clear()

@router.message(F.text == "📋 Список гостей")
async def handle_guests_list(message: Message):
    """Получение и отображение списка всех гостей"""
    await message.answer("⏳ Загружаю список гостей...")

    try:
        result = backend.get_guests()

        if result and result.get("success"):
            guests = result.get("data", [])
            
            if not guests:
                await message.answer(
                    "📋 <b>Список гостей пуст</b>\n\n"
                    "Добавьте первого гостя через меню «➕️ Добавить гостя»",
                    parse_mode="HTML",
                    reply_markup=get_management_menu()
                )
                return

            # Формируем сообщение со списком гостей
            total = len(guests)
            confirmed = sum(1 for g in guests if g.get("confirmed"))
            
            text = (
                f"📋 <b>Список гостей</b>\n\n"
                f"👥 Всего: <b>{total}</b>\n"
                f"✅ Подтвердили: <b>{confirmed}</b>\n"
                f"⏳ Ожидают: <b>{total - confirmed}</b>\n\n"
                f"<b>Подробный список:</b>\n"
            )

            for i, guest in enumerate(guests, 1):
                status = "✅" if guest.get("confirmed") else "⏳"
                token = guest.get("token", "") 
                created_at = guest.get("created_at", "")[:10]  # Только дата
                
                text += (
                    f"\n<b>{i}.</b> {status} <b>{guest.get('name')}</b>\n"
                    f"   🔑 <code>{token}</code>\n"
                    f"   📅 {created_at}\n"
                )

            # Если сообщение слишком длинное, разбиваем на части
            if len(text) > 4096:
                # Отправляем краткую статистику
                summary = (
                    f"📋 <b>Список гостей</b>\n\n"
                    f"👥 Всего: <b>{total}</b>\n"
                    f"✅ Подтвердили: <b>{confirmed}</b>\n"
                    f"⏳ Ожидают: <b>{total - confirmed}</b>\n\n"
                    f"<i>Список слишком длинный для отображения в одном сообщении.</i>"
                )
                await message.answer(
                    summary, parse_mode="HTML", reply_markup=get_management_menu()
                )
            else:
                await message.answer(
                    text, parse_mode="HTML", reply_markup=get_management_menu()
                )

            logger.info(f"Отображён список {total} гостей")

        else:
            error_msg = (
                result.get("error", "Неизвестная ошибка")
                if result
                else "Сервер недоступен"
            )

            await message.answer(
                f"❌ <b>Ошибка получения списка</b>\n\n"
                f"{error_msg}\n\n"
                "Попробуйте ещё раз.",
                parse_mode="HTML",
                reply_markup=get_management_menu(),
            )

            logger.error(f"Ошибка получения списка гостей: {error_msg}")

    except Exception as e:
        logger.error(f"Критическая ошибка при получении списка гостей: {e}")
        await message.answer(
            "❌ <b>Критическая ошибка</b>\n\n"
            "Не удалось загрузить список гостей. Попробуйте позже.",
            parse_mode="HTML",
            reply_markup=get_management_menu(),
        )


# Кнопка "Настройки"
@router.message(F.text == "⚙️ Настройки")
async def handle_settings(message: Message):
    await message.answer(
        "⚙️ <b>Настройки</b>\n\n" "Пока здесь ничего нет. Скоро добавим!",
        parse_mode="HTML",
        reply_markup=get_main_menu(),
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
        reply_markup=get_main_menu(),
    )


# Инлайн-кнопки
@router.callback_query(F.data == "refresh_stats")
async def refresh_stats(callback: CallbackQuery):
    await callback.answer("🔄 Обновляю...")
    # Здесь можно повторно запросить статистику
    await callback.message.edit_text(
        "✅ Статистика обновлена!", reply_markup=get_stats_inline()
    )


@router.callback_query(F.data == "back_to_menu")
async def back_to_menu(callback: CallbackQuery):
    await callback.answer()
    await callback.message.edit_text("🏠 Главное меню", reply_markup=get_main_menu())


# Обработка неизвестных сообщений
@router.message()
async def unknown_message(message: Message):
    await message.answer(
        "❓ Неизвестная команда.\nИспользуйте меню или /start",
        reply_markup=get_main_menu(),
    )
