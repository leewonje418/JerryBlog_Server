import { Request, Response } from 'express';

import { successHandler , loginSuccessHandler } from '../lib/handler/httpSuccessHandler';
import ErrorHandler from '../lib/handler/httpErrorHandler';

import LoginDTO from '../dto/login.dto';
import AuthService from '../service/auth.service';
import emailCode from 'src/lib/email/emailCode';
import sendEmail from 'src/lib/email/sendEmail';

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

    emailDuplicate = async (req: Request, res:Response) => {
        try {
            const { email } = req.body;
            const findEmail = await this.authService.emailCheck(email);
            
            if(findEmail === undefined) {
                successHandler(res, 200, '이메일 중복 확인 성공');
            }
        } catch (err) {
            ErrorHandler(res, err);
        }
    }

    sendEmail = async (req: Request, res: Response)=> {
        try {
            const { email } = req.body;
            await this.authService.deleteEmailCode(email);

            const code: string = emailCode();
            await this.authService.createEmailCode(email, code);

            await sendEmail(email, code);

            successHandler(res, 200, '이메일 코드를 발송하였습니다.');
        } catch (err) {
            ErrorHandler(res, err);
        }
    }
    
    checkEmailCode = async (req: Request, res: Response)=> {
        try {
            const { email, code } = req.body;
            await this.authService.checkEmailCode(email, code);

            successHandler(res, 200, '이메일 인증 성공');
        } catch (err) {
            ErrorHandler(res, err);
        }
    }
}