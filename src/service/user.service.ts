import mongoose, { Document } from 'mongoose';

import User from '../database/post';
import HttpError from '../error/httpError';
import SignUpDTO from '../dto/signup.dto';
import Bcrypt from '../lib/bcrypt/bcrypt';

export default class UserService {
    getUsers = async (): Promise<Document<any>[]> => {
        const users = await User.find();
        return users;
    }

    signUp = async (signUpRequest : SignUpDTO): Promise<Document<any>> => {
        let { name, email, password } = signUpRequest;

        const bcrypt = new Bcrypt();
        password = bcrypt.hashPassword(password);

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