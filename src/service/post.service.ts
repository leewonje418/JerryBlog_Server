import { Document } from 'mongoose';

import Post from '../database/post';
import PostDTO from '../dto/post.dto';

export default class PostService {
    getPosts = async (): Promise<Document<any>[]> => {
        const posts = await Post.find();
        return posts;
    }

    create = async (postRequest: PostDTO): Promise<Document<any>> => {
        const { title, content, fileUrl, creator } = postRequest;
        const newPost = await Post.create({
            title, content, fileUrl, creator
        });
        return newPost;
    }
}