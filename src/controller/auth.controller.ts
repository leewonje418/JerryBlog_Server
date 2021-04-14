import { Request, Response } from 'express';

import { successHandler , loginSuccessHandler } from '../lib/handler/httpSuccessHandler';
import ErrorHandler from '../lib/handler/httpErrorHandler';

import LoginDTO from '../dto/login.dto';
import AuthService from '../service/auth.service';

export default class AuthController {
    private readonly authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    login = async (req: Request, res:Response) => {
        try {
            const loginRequest: LoginDTO = new LoginDTO(req.body);
            await loginRequest.validate();

            const token: string | undefined = await this.authService.login(loginRequest);
            loginSuccessHandler(res, 200, '로그인 성공', token);
        } catch (err) {
            ErrorHandler(res, err);
        }
    }

    logout = async (req: Request, res: Response) => {
        successHandler(res, 200, '로그아웃 성공');
    }
}