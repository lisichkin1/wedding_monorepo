import 'express';

declare global {
  namespace Express {
    interface Request {
      isFromFrontend?: boolean;
      isFromBot?: boolean;
    }
  }
}
