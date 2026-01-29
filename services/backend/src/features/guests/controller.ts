import {
  type ApiResponse,
  type Guest,
  type GuestCreateInput
} from '@shared/types';
import { generateToken } from '@utils/token';
import { type Request, type Response } from 'express';

import pool from '../../db';

// Создание гостя
export const createGuest = async (
  req: Request<never, never, GuestCreateInput>,
  res: Response<ApiResponse<Guest & { confirmLink: string }>>
): Promise<void> => {
  try {
    const { name } = req.body;

    // Валидация
    if (!name || name.trim().length === 0) {
      res.status(400).json({
        success: false,
        error: 'Имя обязательно для заполнения'
      });
      return;
    }

    // Генерируем токен
    const token = generateToken();

    // Вставляем в базу
    const result = await pool.query(
      `INSERT INTO guests (token, name)
       VALUES ($1, $2)
       RETURNING token, name, confirmed, created_at`,
      [token, name.trim()]
    );

    const guest: Guest = result.rows[0];

    // Формируем ссылку для подтверждения
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
       RETURNING token, name, confirmed, created_at`,
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
