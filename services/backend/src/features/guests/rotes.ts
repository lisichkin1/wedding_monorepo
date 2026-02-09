import express from 'express';

import { authenticateGuestRoutes } from '~/middleware/guest-auth';

import { confirmGuest, createGuest, deleteGuest } from './controller';

const router = express.Router();
// GET запросы - доступны фронтенду и боту
router.get('/guests', authenticateGuestRoutes);

// POST /guests - только для бота
router.post('/guests', authenticateGuestRoutes, createGuest);
router.post('/guests', authenticateGuestRoutes, deleteGuest);

// POST /guests/confirm/:token - доступна всем (через токен)
router.post('/guests/confirm/:token', confirmGuest);
export default router;
