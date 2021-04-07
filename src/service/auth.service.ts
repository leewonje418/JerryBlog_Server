import { Document } from 'mongoose';

import Bcrypt from '../lib/bcrypt/bcrypt'
import User from '../database/user';
import HttpError from '../error/httpError';
import { createToken } from '../lib/token'
import LoginDTO from '../dto/login.dto'

export default class AuthService {
    login = async (loginRequest: LoginDTO): Promise<string> => {
        const { email, pw } = loginRequest;

        const bcrypt = new Bcrypt();
        const password = bcrypt.hashPassword(pw.toString());
        
        User.findOne({email, password}).then(async (user) => {
            if(user === undefined) {
                throw new HttpError(401, '인증 실패');
            }
        })
        const token: string = await createToken(email);
        return token;
    }

    user = async (id: number): Promise<Document<any>> => {
        const user = await User.findById(id).select("-password");
        if(!user) {
            throw new HttpError(401, '유저가 존재하지 않습니다.');
        }
        return user;
    }

    host = async (id: string): Promise<Document<any>> => {
        const user = await User.findOne({ id, role: 'MainHost' }).select('-password');
        if(user === null) {
            throw new HttpError(401, '유저가 존재하지 않습니다.');
        }
        return user;
    }
}