import express from 'express';
import mongoose from 'mongoose';
import config from './config'
import cors from 'cors';
import bodyParser from 'body-parser';
import postRoutes from './routes/api/post';
import hpp from 'hpp';
import helmet from 'helmet';

const app = express();
const { MONGO_URI } = config;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(hpp());
app.use(helmet());
app.use(express.json());

mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log('MongoDB connecting Success!!'))
    .catch((e) => console.log(e));
app.get('/');
app.use('/api/post', postRoutes);

export default app;