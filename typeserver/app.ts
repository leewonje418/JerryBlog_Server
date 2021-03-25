import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import hpp from 'hpp';
import helmet from 'helmet';
import path from 'path';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/static', express.static(path.join(__dirname, '../public')));
app.use(cors());
app.use(hpp());
app.use(helmet());

export default app;