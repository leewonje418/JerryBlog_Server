import { Document } from 'mongoose';

import User from '../database/user';
import HttpError from '../error/httpError';
import SignUpDTO from '../dto/signup.dto';
import Bcrypt from '../lib/bcrypt/bcrypt';

export default class UserService {
    getUsers = async (): Promise<Document<any>[]> => {
        const users = await User.find();
        return users;
    }

    signUp = async (signUpRequest : SignUpDTO): Promise<Document<any>> => {
        const { name, email } = signUpRequest;
        let { password } = signUpRequest;

        const bcrypt = new Bcrypt();
        password = bcrypt.hashPassword(password);

        const checkprofile = await User.findOne({ email });
        if(checkprofile) {
            throw new HttpError(400, '이메일 중복');
        }

        try {
            let newUser = await User.create({
                name, email, password
            });
            return newUser;
        } catch (error) {
            throw new HttpError(500, '회원가입 오류');
        }
    }
}