import './config/env';

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import guestRoutes from './features/guests/rotes';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'X-API-Key'],
    credentials: true
  })
);
app.use(express.json());

app.use((_, __, next) => {
  next();
});

app.use(guestRoutes);

export default app;
