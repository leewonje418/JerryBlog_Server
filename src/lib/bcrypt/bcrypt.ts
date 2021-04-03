import * as bcrypt from 'bcryptjs';

export default class Bcrypt {
    hashPassword(password: string): string {
        return bcrypt.hashSync(password, 8);
    }
}