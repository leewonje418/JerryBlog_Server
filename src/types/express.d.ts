import 'dotenv';

declare global {
  namespace Express {
    interface Request {
      hostEmail: string;
    }
  }
}