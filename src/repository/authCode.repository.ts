import { DeleteQueryBuilder, EntityRepository, Repository } from 'typeorm';
import AuthCode from '../entity/authCode';

@EntityRepository(AuthCode)
export default class AuthCodeRepository extends Repository<AuthCode>{
    deleteCode = async (email: string): Promise<DeleteQueryBuilder<AuthCode>> => {
        return this.createQueryBuilder('authcode')
            .delete()
            .where(`email = :email`, { email })
    }
    findByEmailAndCode = async (email: string, code: string): Promise<AuthCode | undefined> => {
        return this.findOne({
            where: {
                email,
                code,
            },
        });
    }
    findByEmailAndCheck = async (email: string): Promise<AuthCode | undefined> => {
        return this.findOne({
            where: {
                email,
                check: true,
            },
        });
    }
}