import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('authcode')
export default class User {
    @PrimaryGeneratedColumn()
    email!: string;

    @Column({
        type: 'varchar'
    })
    code!: string;
}