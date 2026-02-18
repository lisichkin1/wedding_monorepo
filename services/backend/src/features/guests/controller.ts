import { type Request, type Response } from 'express';

import { ApiResponse, Guest, GuestCreateInput } from '~/shared/types';
import { generateToken } from '~/utils';

import pool from '../../db';

// Получение всех гостей
export const getGuests = async (
  req: Request,
  res: Response<ApiResponse<Guest[]>>
): Promise<void> => {
  try {
    const result = await pool.query(
      `SELECT token, name, type, confirmed, created_at 
       FROM guests 
       ORDER BY created_at DESC`
    );

    const guests: Guest[] = result.rows;

    console.log(`Запрошено ${guests.length} гостей`);

    res.json({
      success: true,
      message: 'Список гостей получен',
      data: guests
    });
  } catch (error) {
    console.error('Ошибка получения списка гостей:', error);
    res.status(500).json({
      success: false,
      error: 'Ошибка сервера'
    });
  }
};

// Получение гостя по токену
export const getGuestByToken = async (
  req: Request<{ token: string }>,
  res: Response<ApiResponse<Guest>>
): Promise<void> => {
  try {
    const { token } = req.params;

    // Валидация токена
    if (!token || token.trim().length === 0) {
      res.status(400).json({
        success: false,
        error: 'Токен обязателен'
      });
      return;
    }

    const result = await pool.query(
      `SELECT token, name, type, confirmed, created_at 
       FROM guests 
       WHERE token = $1`,
      [token.trim()]
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        error: 'Гость не найден'
      });
      return;
    }

    const guest: Guest = result.rows[0];

    console.log(`Запрошен гость по токену: ${token} (${guest.name})`);

    res.json({
      success: true,
      message: 'Информация о госте получена',
      data: guest
    });
  } catch (error) {
    console.error('Ошибка получения гостя по токену:', error);
    res.status(500).json({
      success: false,
      error: 'Ошибка сервера'
    });
  }
};

// Создание гостя
export const createGuest = async (
  req: Request<never, never, GuestCreateInput>,
  res: Response<ApiResponse<Guest & { confirmLink: string }>>
): Promise<void> => {
  try {
    const { name, type } = req.body;

    if (!name || name.trim().length === 0) {
      res.status(400).json({
        success: false,
        error: 'Имя обязательно для заполнения'
      });
      return;
    }

    const validTypes = ['male', 'female', 'group'] as const;
    if (!type || !validTypes.includes(type)) {
      res.status(400).json({
        success: false,
        error: `Тип гостя должен быть одним из: ${validTypes.join(', ')}`
      });
      return;
    }

    const token = generateToken();

    const result = await pool.query(
      `INSERT INTO guests (token, name, type)
       VALUES ($1, $2, $3)
       RETURNING token, name, type, confirmed, created_at`,
      [token, name.trim(), type]
    );

    const guest: Guest = result.rows[0];

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const confirmLink = `${frontendUrl}/invite/${token}`;

    console.log(`Создан гость: ${guest.name} (Токен: ${guest.token})`);
    console.log(`Ссылка: ${confirmLink}`);

    res.status(201).json({
      success: true,
      message: 'Гость успешно добавлен',
      data: {
        ...guest,
        confirmLink
      }
    });
  } catch (error) {
    console.error('Ошибка создания гостя:', error);

    if (error instanceof Error && 'code' in error && error.code === '23505') {
      res.status(409).json({
        success: false,
        error: 'Гость с такими данными уже существует'
      });
      return;
    }

    res.status(500).json({
      success: false,
      error: 'Внутренняя ошибка сервера'
    });
  }
};

// Удаление гостя по токену
export const deleteGuest = async (
  req: Request<{ token: string }>,
  res: Response<ApiResponse<{ token: string; name: string }>>
): Promise<void> => {
  try {
    const { token } = req.params;

    // Валидация токена
    if (!token || token.trim().length === 0) {
      res.status(400).json({
        success: false,
        error: 'Токен обязателен'
      });
      return;
    }

    const result = await pool.query(
      `DELETE FROM guests 
       WHERE token = $1 
      RETURNING token, name, type`,
      [token.trim()]
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        error: 'Гость не найден'
      });
      return;
    }

    const deletedGuest = result.rows[0];
    console.log(`🗑️ Гость "${deletedGuest.name}" удалён`);

    res.json({
      success: true,
      message: 'Гость успешно удалён',
      data: {
        token: deletedGuest.token,
        name: deletedGuest.name
      }
    });
  } catch (error) {
    console.error('Ошибка удаления гостя:', error);
    res.status(500).json({
      success: false,
      error: 'Ошибка сервера'
    });
  }
};

// Подтверждение участия
export const confirmGuest = async (
  req: Request<{ token: string }>,
  res: Response<ApiResponse<Guest>>
): Promise<void> => {
  try {
    const { token } = req.params;

    const result = await pool.query(
      `UPDATE guests 
   SET confirmed = true 
   WHERE token = $1 
   RETURNING token, name, type, confirmed, created_at`,
      [token]
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        error: 'Гость не найден или токен недействителен'
      });
      return;
    }

    const guest: Guest = result.rows[0];

    console.log(`✅ Гость "${guest.name}" подтвердил участие`);

    res.json({
      success: true,
      message: 'Участие подтверждено!',
      data: guest
    });
  } catch (error) {
    console.error('Ошибка подтверждения:', error);
    res.status(500).json({
      success: false,
      error: 'Ошибка сервера'
    });
  }
};
