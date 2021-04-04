import { Response } from 'express';

export default (res: Response, status: number, message: string, data?: any) => {
	res.status(status).json({
		message: message,
		data: data && data,
	});

    return;
};
