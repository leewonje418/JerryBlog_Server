import { Request, response, Response } from 'express';

import { successHandler , loginSuccessHandler } from '../lib/handler/httpSuccessHandler';
import ErrorHandler from '../lib/handler/httpErrorHandler';

import LoginDTO from '../dto/login.dto';
import AuthService from '../service/auth.service';

export default class AuthController {
    private readonly authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    // 로그인 헨들러 구현해야됨
    login = async (req: Request, res:Response) => {
        try {
            const loginRequest = new LoginDTO(req.body);
            await loginRequest.validate();

            const token = await this.authService.login(loginRequest);
            loginSuccessHandler(res, 200, '로그인 성공', token);
        } catch (err) {
            ErrorHandler(res, err);
        }
    }

    logout = async (res: Response) => {
        successHandler(res, 200, '로그아웃 성공');
    }

    //용도에띠라 이름을 변경할 수 있음 자료형도 바뀔수 있음 
    user = async (req: any, res: Response) => {
        try {
            const user = await this.authService.user(req.user.id);
            successHandler(res, 200, '유저 전체조회 성공', user);
        } catch (err) {
            ErrorHandler(res, err);
        }
    }
}