import 'dotenv/config';
import logger from '../lib/logger'

// 환경변수 불러오기
const getProcessEnv = (name: string): string => {
    const value = process.env[name];
    if (value === undefined) {
      const err = `${name} 환경변수가 정의되지 않았습니다`;
      logger.error(err, 'getProcessEnv');
      throw new Error(err);
    }
  
    return value;
};

// 몽고디비 주소
export const MONGO_URI = getProcessEnv('MONGO_URI');

// jwt 시크릿 키
export const JWT_SECRET = getProcessEnv('JWT_SECRET');

// 포트번호
export const PORT = getProcessEnv('PORT');