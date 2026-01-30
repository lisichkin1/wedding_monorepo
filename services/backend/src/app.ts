import './config/env';

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import guestRoutes from './features/guests/rotes';

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5000'
  })
);
app.use(express.json());

app.use((_, __, next) => {
  next();
});

// Роуты
app.use(guestRoutes);

export default app;
