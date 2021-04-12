import User from '../entity/user';
import HttpError from '../error/httpError';
import SignUpDTO from '../dto/signup.dto';
import Bcrypt from '../lib/bcrypt/bcrypt';
import { checkRegularExpession } from '../lib/checkRegularExpession';
import UserRepository from '../repository/user.repository';
import { getCustomRepository } from 'typeorm';

export default class UserService {
    getUsers = async (): Promise<User[]> => {
        const userRepository = getCustomRepository(UserRepository);
        const users = await userRepository.find();
        return users;
    }

    signUp = async (signUpRequest : SignUpDTO): Promise<User> => {
        const userRepository = getCustomRepository(UserRepository);
        const { name, email, pw } = signUpRequest;

        await checkRegularExpession(email, pw);

        const bcrypt = new Bcrypt();
        const password = bcrypt.hashPassword(pw);

        const checkprofile = await userRepository.findOne({ email });
        if(checkprofile) {
            throw new HttpError(400, '이메일 중복');
        }

        const user: User = new User();
		user.email = email;
        user.name = name;
        user.password = password;

        const newUser = await userRepository.save(user)

        return newUser;
    }
}