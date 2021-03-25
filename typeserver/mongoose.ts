import logger from './lib/logger';
import mongoose from 'mongoose';
import { MONGO_URI } from './config/config';

export const getConnection = async () => {
    try {
        mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        logger.success('[DB] connected');
    } catch (err) {
      logger.error('[DB] Connection Error', err.message);
      throw err;
    }
};