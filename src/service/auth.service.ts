import Bcrypt from '../lib/bcrypt/bcrypt'
import User from '../entity/user';
import HttpError from '../error/httpError';
import { createToken } from '../lib/token'
import LoginDTO from '../dto/login.dto'
import UserRepository from '../repository/user.repository';
import { getCustomRepository } from 'typeorm';

export default class AuthService {
    login = async (loginRequest: LoginDTO): Promise<string | undefined> => {
        const userRepository = getCustomRepository(UserRepository);
        const { email, pw } = loginRequest;

        const bcrypt = new Bcrypt();
        const password = bcrypt.hashPassword(pw);

        const user = await userRepository.findByEmailAndPassword(email, password);

        if (user === undefined) {
            throw new HttpError(401, '인증 실패');
        }
        
        const token: string = await createToken(user.email);
        return token;
    }

    user = async (email: string): Promise<User> => {
        const userRepository = getCustomRepository(UserRepository);
        const user = await userRepository.findOne(email);
        if(!user) {
            throw new HttpError(401, '유저가 존재하지 않습니다.');
        }
        return user;
    }

    getHost = async (email: string): Promise<User> => {
        const userRepository = getCustomRepository(UserRepository);
        const host = await userRepository.findByEmailAndRole(email);
        if(!host) {
            throw new HttpError(401, '호스트가 존재하지 않습니다.');
        }
        return host;
    }
}