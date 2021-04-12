import { Request, Response } from 'express';

import { successHandler } from '../lib/handler/httpSuccessHandler';
import ErrorHandler from '../lib/handler/httpErrorHandler';

import PostDTO from '../dto/post.dto';
import PostService from '../service/post.service';
import Post from '../entity/post';

export default class PostController {
    private readonly postService: PostService;

    constructor() {
        this.postService = new PostService();
    }

    getPosts = async(req: Request, res: Response) => {
        try {
            const posts: Post[] = await this.postService.getPosts();
            successHandler(res, 200, '게시글 전채 불러오기 성공', posts);
        } catch (err) {
            ErrorHandler(res, err);
        }
    }

    create = async(req: Request, res: Response) => {
        try {
            console.log(req);
            const { body } = req;

            const postRequest = new PostDTO(body);
            await postRequest.validate();

            const post = this.postService.create('', postRequest);
            successHandler(res, 200, '게시글 게시 성공', post);
        } catch (err) {
            ErrorHandler(res, err);
        }
    }
}