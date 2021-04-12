import { Column, Entity, PrimaryColumn, RelationId, ManyToOne, JoinColumn } from 'typeorm';
import Category from './category';
import User from './user';

@Entity('post')
export default class Post {
    @PrimaryColumn()
    idx!: number;

    @RelationId((user: User) => user.email)
    userEmail!: string;

    @ManyToOne(type => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @RelationId((category: Category) => category.idx)
    categoryIdx!: string;

    @ManyToOne(type => Category)
    @JoinColumn({ name: 'category_id' })
    category!: Category;

    @Column({
        type: 'varchar'
    })
    title!: string;

    @Column({
        type: 'varchar'
    })
    content!: string;

    @Column({
        type: 'int'
    })
    views!: number;
    
    @Column({
        nullable: true
    })
    fileUrl?: string | undefined;

    @Column({
        type: 'datetime'
    })
    createdAt: Date = new Date();    
}