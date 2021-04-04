import { Request, Response } from 'express';
import { Document } from 'mongoose';

import SuccessHandler from '../lib/handler/httpSuccessHandler';
import ErrorHandler from '../lib/handler/httpErrorHandler';

import SignUpRequest from '../request/signup.request';
import UserService from '../service/user.service';

export default class UserController {
    private readonly userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    getUsers = async(req: Request, res: Response) => {
        const users: Document<any>[] = await this.userService.getUsers();
        res.status(200).json({
            users
        })
    }

    signUp = async(req: Request, res: Response) => {
        const signupRequest = new SignUpRequest(req.body);

        await signupRequest.validate();

        try {
            const newUser = this.userService.signUp(signupRequest);
            res.status(200).json({
                message: '회원가입 성공',
                data : newUser
            })
        } catch (err) {
            ErrorHandler(res, err);
        }
    }
}