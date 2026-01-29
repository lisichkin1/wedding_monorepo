import express from 'express';

import { confirmGuest, createGuest } from './controller';

const router = express.Router();

router.post('/api/guests', createGuest);
router.post('/api/confirm/:token', confirmGuest);

export default router;
