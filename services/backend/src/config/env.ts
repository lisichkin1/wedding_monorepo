import dotenv from 'dotenv';

dotenv.config({ debug: true });

export const env = {
  PORT: process.env.PORT || '5000',
  DATABASE_URL: process.env.DATABASE_URL,
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5000'
};
