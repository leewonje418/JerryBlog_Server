import { Response } from 'express';

export const successHandler = (res: Response, status: number, message: string, data?: any) => {
	return res.status(status).json({
		message: message,
		data: data
	});
};

export const loginSuccessHandler = (res: Response, status: number, message: string, token: string) => {
	return res.status(status).json({
		message: message,
		data: {
            'x-access-token' : token
        }
	});
};
