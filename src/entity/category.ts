import { Column, Entity, PrimaryColumn, RelationId, ManyToOne, JoinColumn } from 'typeorm';
import Post from './post';
import User from './user';

@Entity('category')
export default class Category {
    @PrimaryColumn()
    idx!: number;

    @Column({
        type: 'varchar'
    })
    name!: string;
}