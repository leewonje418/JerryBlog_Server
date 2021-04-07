import { Document } from 'mongoose';

import Post from '../database/post';
import PostDTO from '../dto/post.dto';

export default class PostService {
    getPosts = async (): Promise<Document<any>[]> => {
        const posts = await Post.find();
        return posts;
    }

    create = async (id: number, postRequest: PostDTO): Promise<Document<any>> => {
        const { title, content, fileUrl } = postRequest;
        const newPost = await Post.create({
            title, content, fileUrl, creator: id
        });
        return newPost;
    }
}