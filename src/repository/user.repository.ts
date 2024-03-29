import { DeleteQueryBuilder, EntityRepository, Repository } from 'typeorm';
import User from '../entity/user';
import Role from '../enum/Role'

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
    findByEmailAndPassword = async (email: string, password: string): Promise<User | undefined> => {
        return this.findOne({
            where: {
                email,
                password,
            },
        });
    }
    findByEmailAndRole = async (email: string): Promise<User | undefined> => {
        return this.findOne({
            where: {
                email,
                role : Role.MAINHOST
            },
        });
    }
    findUsers = async (email: string): Promise<User[] | undefined> => {
        return this.find({
            where: {
                email
            },
            select: ['email', 'name', 'role']
        });
    }
    findUser = async (email: string): Promise<User | undefined> => {
        return this.findOne({
            where: {
                email
            },
            select: ['email', 'name', 'role']
        });
    }
}