import app from './app';
import config from './config/index';
import http from 'http';

const { PORT } = config;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server started on Port ${PORT}`);
});