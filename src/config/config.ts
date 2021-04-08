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

// MySQL
export const MYSQL = {
  USERNAME: getProcessEnv('MYSQL_USERNAME'),
  PASSWORD: getProcessEnv('MYSQL_PASSWORD'),
  DATABASE: getProcessEnv('MYSQL_DATABASE'),
  HOST: getProcessEnv('MYSQL_HOST'),
  PORT: parseInt(getProcessEnv('MYSQL_PORT'), 10),
  SYNC: getProcessEnv('MYSQL_SYNC') === 'true',
};

// jwt 시크릿 키
export const JWT_SECRET = getProcessEnv('JWT_SECRET');

// 포트번호
export const PORT = getProcessEnv('PORT');