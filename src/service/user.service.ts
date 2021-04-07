import { Document } from 'mongoose';

import User from '../database/user';
import HttpError from '../error/httpError';
import SignUpDTO from '../dto/signup.dto';
import Bcrypt from '../lib/bcrypt/bcrypt';
import { checkRegularExpession } from '../lib/checkRegularExpession';

export default class UserService {
    getUsers = async (): Promise<Document<any>[]> => {
        const users = await User.find();
        return users;
    }

    signUp = async (signUpRequest : SignUpDTO): Promise<Document<any>> => {
        const { name, email, pw } = signUpRequest;

        await checkRegularExpession(email, pw);

        const bcrypt = new Bcrypt();
        const password = bcrypt.hashPassword(pw);

        const checkprofile = await User.findOne({ email });
        if(checkprofile) {
            throw new HttpError(400, '이메일 중복');
        }

        let newUser = await User.create({
            name, email, password
        });
        return newUser;
    }
}