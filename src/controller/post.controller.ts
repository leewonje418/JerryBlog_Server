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

    getPost = async(req: Request, res: Response) => {
        try {
            const id: number = Number(req.params.id);
            const post: Post | undefined = await this.postService.getPost(id);
            successHandler(res, 200, '게시글 전채 불러오기 성공', post);
        } catch (err) {
            ErrorHandler(res, err);
        }
    }

    create = async(req: Request, res: Response) => {
        try {
            const { body } = req;
            const postRequest: PostDTO = new PostDTO(body);

            await postRequest.validate();
            await this.postService.create(postRequest);
            
            successHandler(res, 200, '게시글 게시 성공');
        } catch (err) {
            ErrorHandler(res, err);
        }
    }

    update = async(req: Request, res: Response) => {
        try {
            // post_id
            const id: number = Number(req.params.id);
            const { body } = req;
            const postRequest: PostDTO = new PostDTO(body);

            await postRequest.validate();
            await this.postService.update(id, postRequest);

            successHandler(res, 200, '게시글 수정 성공');
        } catch (err) {
            ErrorHandler(res, err);
        }
    }

    delete = async(req: Request, res: Response) => {
        try {
            // post_id
            const id: number = Number(req.params.id);
            await this.postService.delete(id);

            successHandler(res, 200, '게시글 삭제 성공');
        } catch (err) {
            ErrorHandler(res, err);
        }
    }
}