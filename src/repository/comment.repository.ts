import { EntityRepository, Repository } from 'typeorm';
import Comment from '../entity/comment';

@EntityRepository(Comment)
export default class CommentRepository extends Repository<Comment> {
}