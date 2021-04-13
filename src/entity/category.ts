import { Column, Entity, PrimaryColumn, RelationId, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import Post from './post';
import User from './user';

@Entity('category')
export default class Category {
    @PrimaryGeneratedColumn()
    idx!: number;

    @Column({
        type: 'varchar'
    })
    name!: string;
}