import { NextFunction, Request, Response } from 'express';

export const authenticateBot = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const apiKeyHeader = req.headers['x-api-key'];
  const apiKey = Array.isArray(apiKeyHeader) ? apiKeyHeader[0] : apiKeyHeader;

  if (!apiKey) {
    res.status(401).json({
      success: false,
      error: 'API ключ обязателен'
    });
    return;
  }

  if (apiKey !== process.env.BOT_API_KEY) {
    res.status(403).json({
      success: false,
      error: 'Неверный API ключ'
    });
    return;
  }

  req.isFromBot = true;
  next();
};
