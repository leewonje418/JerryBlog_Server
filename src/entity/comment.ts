import { Column, Entity, RelationId, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import Post from './post';
import User from './user';

@Entity('comment')
export default class Comment {
    @PrimaryGeneratedColumn()
    idx!: number;

    @RelationId((comment: Comment) => comment.user)
    userEmail!: string;

    @ManyToOne(type => User)
    @JoinColumn({ name: 'user_email' })
    user!: User;

    @RelationId((comment: Comment) => comment.post)
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