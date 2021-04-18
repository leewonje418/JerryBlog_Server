import Bcrypt from '../lib/bcrypt/bcrypt'
import User from '../entity/user';
import HttpError from '../error/httpError';
import { createToken } from '../lib/token'
import LoginDTO from '../dto/login.dto'
import UserRepository from '../repository/user.repository';
import { getCustomRepository } from 'typeorm';

export default class AuthService {
    login = async (loginRequest: LoginDTO): Promise<string | undefined> => {
        const userRepository: UserRepository = getCustomRepository(UserRepository);
        const { email, pw } = loginRequest;

        const bcrypt: Bcrypt = new Bcrypt();

        const user: User | undefined = await userRepository.findOne(email);
        if (user === undefined) {
            throw new HttpError(401, '이메일이 올바르지 않습니다.');
        }

        const compareResult: boolean = await bcrypt.comparePassword(pw, user.password);
        if (compareResult === false) {
            throw new HttpError(401, '비밀번호가 올바르지 않습니다.');
        }

        const token: string = await createToken(email);
        return token;
    }

    getUsers = async (email: string): Promise<User[]> => {
        const userRepository: UserRepository = getCustomRepository(UserRepository);
        const user: User[] | undefined = await userRepository.findUsers(email);
        if(user === undefined) {
            throw new HttpError(401, '유저가 존재하지 않습니다.');
        }
        return user;
    }

    getUser = async (email: string): Promise<User> => {
        const userRepository: UserRepository = getCustomRepository(UserRepository);
        const user: User | undefined = await userRepository.findUser(email);
        if(user === undefined) {
            throw new HttpError(401, '유저가 존재하지 않습니다.');
        }
        return user;
    }

    getHost = async (email: string): Promise<User> => {
        const userRepository: UserRepository = getCustomRepository(UserRepository);
        const host: User | undefined = await userRepository.findByEmailAndRole(email);
        if(host === undefined) {
            throw new HttpError(401, '호스트가 존재하지 않습니다.');
        }
        return host;
    }
}