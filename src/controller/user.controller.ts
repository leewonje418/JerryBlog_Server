import { Request, response, Response } from 'express';
import { Document } from 'mongoose';

import SuccessHandler from '../lib/handler/httpSuccessHandler';
import ErrorHandler from '../lib/handler/httpErrorHandler';

import SignUpDTO from '../dto/signup.dto';
import UserService from '../service/user.service';

export default class UserController {
    private readonly userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    getUsers = async(req: Request, res: Response) => {
        const users: Document<any>[] = await this.userService.getUsers();
        SuccessHandler(response, 200, '유저 전채 불러오기 성공', users);
    }

    signUp = async(req: Request, res: Response) => {
        const signupRequest = new SignUpDTO(req.body);
        await signupRequest.validate();

        try {
            const newUser = this.userService.signUp(signupRequest);
            SuccessHandler(response, 200, '회원가입 성공', newUser);
        } catch (err) {
            ErrorHandler(res, err);
        }
    }
}