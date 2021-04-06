import { NextFunction, Request, Response } from "express";
import HttpError from "../../error/httpError";
import AuthService from "../../service/auth.service";
import httpErrorHandler from "../handler/httpErrorHandler";
import { verifyToken } from "../token";

export const authHost = async (req: any, res: Response, next: NextFunction) => {
    const decoded: string = await validateToken(req, res) as string;
    const authService = new AuthService();
    const host = await authService.host;
  
    if (host === undefined) {
      throw new HttpError(403, '권한 없음');
    }
  
    req.user = decoded;
    next();
}

const validateToken = async (req: Request, res: Response): Promise<string | undefined> => {
    const token = req.headers['x-access-token'];
  
    try {
      if (token === undefined) {
        throw new Error('jwt must be provided');
      }
  
      if (Array.isArray(token)) {
        throw new Error('token is array');
      }
  
      const decoded = await verifyToken(token);
  
      return decoded;
    } catch (err) {
  
      let code;
      let message;
  
      switch (err.message) {
        case 'jwt must be provided':
        case 'token is array':
        case 'jwt malformed':
        case 'invalid token':
        case 'invalid signature':
        case 'invalid signature':
          code = 401;
          message = '위조된 토큰';
          break;
  
        case 'jwt expired':
          code = 410;
          message = '만료된 토큰';
          break;
  
        case 'no user':
          code = 404;
          message = '회원 없음';
          break;
  
        default:
          code = 500;
          message = '서버 오류';
      }
  
      httpErrorHandler(res, new HttpError(code, message));
    }
  }