import express from 'express';

import { authenticateBot } from '~/middleware/auth';

import {
  confirmGuest,
  createGuest,
  deleteGuest,
  getGuestByToken,
  getGuests
} from './controller';

const router = express.Router();
// доступны фронтенду и боту
router.get('/guests/:token', getGuestByToken);

// только для бота
router.get('/allguests', authenticateBot, getGuests);
router.post('/guests', authenticateBot, createGuest);
router.delete('/guests/:token', authenticateBot, deleteGuest);

// POST /guests/confirm/:token - доступна всем (через токен)
router.post('/guests/confirm/:token', confirmGuest);
export default router;
