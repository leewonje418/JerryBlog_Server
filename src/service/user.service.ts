import mongoose, { Document } from 'mongoose';

import User from '../database/post';
import HttpError from '../error/httpError';
import SignUpRequest from '../request/signup.request';

export default class UserService {
    getUsers = async (): Promise<Document<any>[]> => {
        const users = await User.find();
        return users;
    }

    signUp = async (signuprequest : SignUpRequest): Promise<Document<any>> => {
        const { name, email, password } = signuprequest;
        try {
            const newUser = await User.create({
                name, email, password
            });
            return newUser;
        } catch (error) {
            throw new HttpError(500, '회원가입 오류');
        }
    }
}