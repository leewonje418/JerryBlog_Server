import { Request, Response } from 'express';
import { Document } from 'mongoose';
import httpError from '../error/httpError';
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
            if (newUser === undefined) {
                throw new httpError(500, '게시글등록 서버 오류');
            }
            res.status(200).json({
                message: '회원가입 성공',
                data : newUser
            })
        } catch (error) {
            throw new httpError(500, '게시글등록 서버 오류');
        }
    }
}