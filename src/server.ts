import * as http from 'http';
import app from './app';
import * as database from './orm';
import { PORT } from './config/config';

const server = http.createServer(app);

database.getConnection();

server.listen(PORT, () => {
  console.log(`Server started on Port ${PORT}`);
});