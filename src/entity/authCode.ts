import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('authcode')
export default class AuthCode {
    @PrimaryColumn()
    email!: string;

    @Column({
        type: 'varchar'
    })
    code!: string;

    @Column({
        type: 'boolean'
    })
    check: boolean = false;
}