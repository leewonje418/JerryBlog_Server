import { EntityRepository, Repository } from 'typeorm';
import Post from '../entity/post';

@EntityRepository(Post)
export default class PostRepository extends Repository<Post> {
    findByTitle = async (keyword: string): Promise<Post[]> => {
        return this.createQueryBuilder('post')
            .where('title ILIKE :searchKeyword', {searchKeyword: keyword})
            .getMany();
    }
}