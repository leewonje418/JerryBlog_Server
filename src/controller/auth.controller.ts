import { Request, Response } from 'express';

import SuccessHandler from '../lib/handler/httpSuccessHandler';
import ErrorHandler from '../lib/handler/httpErrorHandler';

import LoginRequest from '../request/login.request';
import AuthService from '../service/auth.service';

export default class AuthController {
    private readonly authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    // 로그인 헨들러 구현해야됨
    login = async (req: Request, res:Response) => {
        try {
            const loginRequest = new LoginRequest(req.body);
            await loginRequest.validate();

            const token = await this.authService.login(loginRequest);

            res.status(200).json({
                message: '로그인 성공',
                data: {
                  'x-access-token': token,
                },
            });
        } catch (err) {
            ErrorHandler(res, err);
        }
    }

    logout = async (res: Response) => {
        res.status(200).json({
            message: '로그아웃 성공'
        })
    }

    //용도에띠라 이름을 변경할 수 있음 자료형도 바뀔수 있음 
    user = async (req: any, res: Response) => {
        try {
            const user = await this.authService.user(req.user.id);
            res.status(200).json(user);
        } catch (err) {
            ErrorHandler(res, err);
        }
    }
}