import express from 'express';
import mongoose from 'mongoose';
import config from './config'
import cors from 'cors'
import bodyParser from 'body-parser';

const app = express();
const { MONGO_URI } = config;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connecting Success!!'))
    .catch((e) => console.log(e));
app.get('/');

export default app;