import { Column, Entity, PrimaryColumn, RelationId, ManyToOne, JoinColumn } from 'typeorm';
import Post from './post';
import User from './user';

@Entity('comment')
export default class Comment {
    @PrimaryColumn()
    idx!: number;

    @RelationId((user: User) => user.email)
    userIdx!: string;

    @ManyToOne(type => User)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @RelationId((post: Post) => post.idx)
    postIdx!: number;

    @ManyToOne(type => Post)
    @JoinColumn({ name: 'post_id' })
    post!: Post;

    @Column({
        type: 'varchar'
    })
    content!: string;

    @Column({
        type: 'datetime'
    })
    createdAt: Date = new Date(); 
}