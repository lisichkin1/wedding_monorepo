import express from 'express';

import { authenticateBot } from '~/middleware/auth';

import {
  confirmGuest,
  createGuest,
  deleteGuest,
  getGuests
} from './controller';

const router = express.Router();
// GET запросы - доступны фронтенду и боту
router.get('/allguests', getGuests);

// POST /guests - только для бота
router.post('/guests', authenticateBot, createGuest);
router.delete('/guests/:token', authenticateBot, deleteGuest);

// POST /guests/confirm/:token - доступна всем (через токен)
router.post('/guests/confirm/:token', confirmGuest);
export default router;
