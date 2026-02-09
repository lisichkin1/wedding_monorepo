import express from 'express';

import { authenticateGuestRoutes } from '~/middleware/guest-auth';

import { confirmGuest, createGuest } from './controller';

const router = express.Router();
// GET запросы - доступны фронтенду и боту
router.get('/guests', authenticateGuestRoutes);

// POST /guests - только для бота
router.post('/guests', authenticateGuestRoutes, createGuest);

// POST /guests/confirm/:token - доступна всем (через токен)
router.post('/guests/confirm/:token', confirmGuest);
export default router;
