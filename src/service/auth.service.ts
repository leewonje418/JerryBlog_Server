import Bcrypt from '../lib/bcrypt/bcrypt'
import User from '../entity/user';
import HttpError from '../error/httpError';
import { createToken } from '../lib/token'
import LoginDTO from '../dto/login.dto'
import UserRepository from '../repository/user.repository';
import { getCustomRepository } from 'typeorm';
import AuthCode from 'src/entity/authCode';
import AuthCodeRepository from 'src/repository/authCode.repository';

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

    getUser = async (email: string): Promise<User | undefined> => {
        const userRepository: UserRepository = getCustomRepository(UserRepository);
        const user: User | undefined = await userRepository.findUser(email);

        return user;
    }

    existEmail = async (email: string): Promise<User | undefined> => {
        const userRepository: UserRepository = getCustomRepository(UserRepository);
        const user: User | undefined = await userRepository.findUser(email);
        if(user !== undefined) {
            throw new HttpError(401, '중복된 이메일 입니다.');
        }
        return user;
    }

    getHost = async (email: string): Promise<User | undefined> => {
        const userRepository: UserRepository = getCustomRepository(UserRepository);
        const host: User | undefined = await userRepository.findByEmailAndRole(email);

        return host;
    }

    emailCheck = async (email: string): Promise<User | undefined> => {
        const userRepository: UserRepository = getCustomRepository(UserRepository);
        const host: User | undefined = await userRepository.findOne(email);
        if(host !== undefined) {
            throw new HttpError(401, '이미 존재하는 이메일 입니다.');
        }
        return host;
    }

    createEmailCode = async(email: string, code: string): Promise<AuthCode> => {
        const authCodeRepository: AuthCodeRepository = getCustomRepository(AuthCodeRepository);

        const authCode: AuthCode = new AuthCode();
        authCode.email = email;
        authCode.code = code;

        const newCode: AuthCode = await authCodeRepository.save(authCode);

        return newCode;
    }

    deleteEmailCode = async(email: string) => {
        const authCodeRepository: AuthCodeRepository = getCustomRepository(AuthCodeRepository);
        await authCodeRepository.delete(email);
    }

    checkEmailCode = async (email: string, code: string): Promise<AuthCode | undefined> => {
        const authCodeRepository: AuthCodeRepository = getCustomRepository(AuthCodeRepository);
        const emailCode: AuthCode | undefined = await authCodeRepository.findByEmailAndCode(email, code);
        
        if(emailCode === undefined) {
            throw new HttpError(401, '이메일 코드가 잘못되었습니다.');
        }

        const checkAuthCode: AuthCode = new AuthCode();
        checkAuthCode.email = email;
        checkAuthCode.code = code;
        checkAuthCode.check = true;

        await authCodeRepository.save(checkAuthCode);

        return emailCode; 
    }
}