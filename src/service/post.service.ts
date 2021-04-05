import mongoose, { Document } from 'mongoose';

import Post from '../database/post';
import HttpError from '../error/httpError';
import PostDTO from '../dto/post.dto';

export default class PostService {
    getPosts = async (): Promise<Document<any>[]> => {
        const posts = await Post.find();
        return posts;
    }

    create = async (postRequest: PostDTO): Promise<Document<any>> => {
        const { title, content, fileUrl, creator } = postRequest;
        try {
            const newPost = await Post.create({
                title, content, fileUrl, creator
            });
            return newPost;
        } catch (error) {
            throw new HttpError(500, '게시글 등록 오류');
        }
    }
}