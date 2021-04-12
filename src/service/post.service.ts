import Post from '../entity/post';
import PostDTO from '../dto/post.dto';
import PostRepository from '../repository/post.repository';
import { getCustomRepository } from 'typeorm';

export default class PostService {
    getPosts = async (): Promise<Post[]> => {
        const postRepository = getCustomRepository(PostRepository);
        const posts = await postRepository.find();
        return posts;
    }

    create = async (hostEmail: string, postRequest: PostDTO): Promise<Post> => {
        const postRepository = getCustomRepository(PostRepository);
        const { title, content, fileUrl } = postRequest;

        const post: Post = new Post();
        post.userEmail = hostEmail;
		post.title = title;
        post.content = content;
        post.fileUrl = fileUrl;

        const newPost = await postRepository.save(post)
        
        return newPost;
    }
}