import { Request, response, Response } from 'express';
import { Document } from 'mongoose';

import SuccessHandler from '../lib/handler/httpSuccessHandler';
import ErrorHandler from '../lib/handler/httpErrorHandler';

import PostDTO from '../dto/post.dto';
import PostService from '../service/post.service';

export default class PostController {
    private readonly postService: PostService;

    constructor() {
        this.postService = new PostService();
    }

    getPosts = async(req: Request, res: Response) => {
        try {
            const posts: Document<any>[] = await this.postService.getPosts();
            SuccessHandler(response, 200, '게시글 전채 불러오기 성공', posts);
        } catch (err) {
            ErrorHandler(res, err);
        }
    }

    create = async(req: Request, res: Response) => {
        const postRequest = new PostDTO(req.body);
        await postRequest.validate();

        try {
            const post = this.postService.create(postRequest);
            SuccessHandler(response, 200, '게시글 게시 성공', post);
        } catch (err) {
            ErrorHandler(res, err);
        }
    }
}