import { Entity, RelationId, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import Post from './post';
import User from './user';

@Entity('view')
export default class View {
    @PrimaryColumn()
    idx!: number;

    @RelationId((view: View) => view.user)
    userEmail!: string;

    @ManyToOne(type => User)
    @JoinColumn({ name: 'user_email' })
    user!: User;

    @RelationId((view: View) => view.post)
    postIdx!: number;

    @ManyToOne(type => Post)
    @JoinColumn({ name: 'post_id' })
    post!: Post;
}