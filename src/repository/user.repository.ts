import { EntityRepository, Repository } from 'typeorm';
import User from '../entity/user';
import Role from '../../enum/Role'

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
    findByIdAndRole = async (email: string): Promise<User | undefined> => {
        return this.findOne({
            where: {
                email,
                role : Role.MAINHOST
            },
        });
    }
}