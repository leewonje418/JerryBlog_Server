import { Response } from 'express';
import logger from '../logger/logger';

export default (res: Response, status: number, message: string, token: string) => {
	res.status(status).json({
		message: message,
		data: {
            'x-access-token' : token
        }
	});

    return;
};