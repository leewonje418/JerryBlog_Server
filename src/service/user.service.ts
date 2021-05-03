import User from '../entity/user';
import HttpError from '../error/httpError';
import SignUpDTO from '../dto/signup.dto';
import Bcrypt from '../lib/bcrypt/bcrypt';
import { checkRegularExpession } from '../lib/checkRegularExpession';
import UserRepository from '../repository/user.repository';
import { DeleteResult, getCustomRepository } from 'typeorm';
import Role from '../enum/Role';
import AuthCodeRepository from 'src/repository/authCode.repository';
import AuthCode from 'src/entity/authCode';

export default class UserService {
    getUsers = async (): Promise<User[]> => {
        const userRepository: UserRepository = getCustomRepository(UserRepository);
        const users: User[] = await userRepository.find();
        return users;
    }

    signUp = async (signUpRequest : SignUpDTO): Promise<User> => {
        const userRepository: UserRepository = getCustomRepository(UserRepository);
        const authCodeRepository: AuthCodeRepository = getCustomRepository(AuthCodeRepository);

        const { name, email, pw } = signUpRequest;
        const { USER } = Role;

        const checkprofile: User | undefined = await userRepository.findOne({ email });
        if(checkprofile) {
            throw new HttpError(400, '이메일 중복');
        }

        await checkRegularExpession(email, pw);

        const checkEmailCode: AuthCode | undefined = await authCodeRepository.findByEmailAndCheck(email);
        if(checkEmailCode === undefined) {
            throw new HttpError(400, '이메일 인증을 완료해주세요.');
        }

        const bcrypt: Bcrypt = new Bcrypt();
        const password: string = bcrypt.hashPassword(pw);

        const user: User = new User();
		user.email = email;
        user.name = name;
        user.password = password;
        user.role = USER;

        const newUser: User = await userRepository.save(user)

        return newUser;
    }

    updateName = async (email: string, name: string): Promise<User | undefined> => {
        const userRepository: UserRepository = getCustomRepository(UserRepository);

        const user: User = new User();
		user.email = email;
        user.name = name;

        const updateUser: User = await userRepository.save(user)

        return updateUser;
    }
    
    delete = async (email: string) => {
        const userRepository: UserRepository = getCustomRepository(UserRepository);
        await userRepository.delete(email);
    }
}