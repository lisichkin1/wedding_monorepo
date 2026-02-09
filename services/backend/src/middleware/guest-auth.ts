import { type NextFunction, type Request, type Response } from 'express';

import { authenticateBot, checkFrontendOrigin } from './auth';

export const authenticateGuestRoutes = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const method = req.method.toUpperCase();

  if (req.path.includes('/confirm') && method === 'POST') {
    next();
    return;
  }

  if (method === 'POST') {
    authenticateBot(req, res, next);
    return;
  }

  checkFrontendOrigin(req, res, () => {
    if (req.isFromFrontend) {
      next();
      return;
    }

    authenticateBot(req, res, next);
  });
};
