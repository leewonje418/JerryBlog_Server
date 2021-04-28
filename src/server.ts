import * as http from 'http';
import app from './app';
import * as database from './orm';
import { PORT } from './config/config';
import logger from './lib/logger';

const server: http.Server = http.createServer(app);

database.getConnection();

server.listen(PORT, () => {
  logger.success(`Server started on Port ${PORT}`);
});