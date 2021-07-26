import { Request, Response } from 'express';

import { successHandler } from '../lib/handler/httpSuccessHandler';
import ErrorHandler from '../lib/handler/httpErrorHandler';

import SignUpDTO from '../dto/signup.dto';
import UserService from '../service/user.service';
import User from '../entity/user';
import AuthService from 'src/service/auth.service';

export default class UserController {
    private readonly userService: UserService;
    private readonly authService: AuthService;

    constructor() {
        this.userService = new UserService();
        this.authService = new AuthService();
    }

    getUsers = async(req: Request, res: Response) => {
        try {
            const users: User[] = await this.userService.getUsers();
            successHandler(res, 200, '유저 전채 불러오기 성공', users);
        } catch (err) {
            ErrorHandler(res, err);
        }
    }

    getUser = async(req: Request, res: Response) => {
        try {
            const { userEmail } = req;
            const users: User | undefined = await this.authService.getUser(userEmail);
            successHandler(res, 200, ' 내정보 불러오기 성공', users);
        } catch (err) {
            ErrorHandler(res, err);
        }
    }

    signUp = async(req: Request, res: Response) => {
        try {
            const signupRequest: SignUpDTO = new SignUpDTO(req.body);
            await signupRequest.validate();
            
            await this.userService.signUp(signupRequest);
            successHandler(res, 200, '회원가입 성공');
        } catch (err) {
            ErrorHandler(res, err);
        }
    }

    updateName = async(req: Request, res: Response) => {
        try {
            const { userEmail } = req;
            const { name } = req.body;

            await this.userService.updateName(userEmail, name);

            successHandler(res, 200, '이름수정 성공');
        } catch (err) {
            ErrorHandler(res, err);
        }
    }

    delete = async(req: Request, res: Response) => {
        try {
            const { userEmail } = req;
            await this.userService.delete(userEmail);
            successHandler(res, 200, '계정삭제 성공');
        } catch (err) {
            ErrorHandler(res, err);
        }
    }
}