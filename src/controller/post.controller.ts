import { Request, Response } from 'express';
import { Document } from 'mongoose';

import httpError from '../error/httpError';

import PostRequest from '../request/post.request';
import PostService from '../service/post.service';

export default class PostController {
    private readonly postService: PostService;

    constructor() {
        this.postService = new PostService();
    }

    getPosts = async(req: Request, res: Response) => {
        const posts: Document<any>[] = await this.postService.getPosts();
        res.status(200).json({
            posts
        })
    }

    create = async(req: Request, res: Response) => {
        const postRequest = new PostRequest(req.body);

        await postRequest.validate();

        try {
            const post = this.postService.create(postRequest);
            if (post === undefined) {
                throw new httpError(500, '게시글등록 서버 오류');
            }
            res.status(200).json({
                post
            })
        } catch (error) {
            throw new httpError(500, '게시글등록 서버 오류');
        }
    }
}