import PostRepository from 'src/repository/post.repository';
import { getCustomRepository } from 'typeorm';
import Post from '../entity/post';

export default class SearchService {
    search = async (keyword: string): Promise<Post[] | undefined> => {
        const postRepository: PostRepository = getCustomRepository(PostRepository);
        const post: Post[] | undefined = await postRepository.findByTitle(keyword);
        return post;
    }
}