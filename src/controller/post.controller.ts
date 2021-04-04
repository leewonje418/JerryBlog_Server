import { Request, Response } from 'express';
import { Document } from 'mongoose';

import SuccessHandler from '../lib/handler/httpSuccessHandler';
import ErrorHandler from '../lib/handler/httpErrorHandler';

import PostRequest from '../request/post.request';
import PostService from '../service/post.service';

export default class PostController {
    private readonly postService: PostService;

    constructor() {
        this.postService = new PostService();
    }

    getPosts = async(req: Request, res: Response) => {
        try {
            const posts: Document<any>[] = await this.postService.getPosts();
            res.status(200).json({
                posts
            })
        } catch (err) {
            ErrorHandler(res, err);
        }
    }

    create = async(req: Request, res: Response) => {
        const postRequest = new PostRequest(req.body);

        await postRequest.validate();

        try {
            const post = this.postService.create(postRequest);
            res.status(200).json({
                post
            })
        } catch (err) {
            ErrorHandler(res, err);
        }
    }
}