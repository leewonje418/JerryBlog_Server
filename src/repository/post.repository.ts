import { EntityRepository, Repository } from 'typeorm';
import Post from '../entity/post';

@EntityRepository(Post)
export default class PostRepository extends Repository<Post> {
}