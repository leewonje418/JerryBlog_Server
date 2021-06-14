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
            const idx: number = Number(req.params.id);
            console.log(idx);
            const post: Post | undefined = await this.postService.getPost(idx);
            successHandler(res, 200, '게시글 전채 불러오기 성공', post);
        } catch (err) {
            ErrorHandler(res, err);
        }
    }

    create = async(req: Request, res: Response) => {
        try {
            const { body } = req;
            const { userEmail } = req;
            const postRequest: PostDTO = new PostDTO(body);

            await postRequest.validate();
            await this.postService.create(userEmail, postRequest);
            
            successHandler(res, 200, '게시글 게시 성공');
        } catch (err) {
            ErrorHandler(res, err);
        }
    }

    update = async(req: Request, res: Response) => {
        try {
            // post_id
            const idx: number = Number(req.params.idx);
            const { body } = req;
            const postRequest: PostDTO = new PostDTO(body);

            await postRequest.validate();
            await this.postService.update(idx, postRequest);

            successHandler(res, 200, '게시글 수정 성공');
        } catch (err) {
            ErrorHandler(res, err);
        }
    }

    delete = async(req: Request, res: Response) => {
        try {
            // post_id
            const idx: number = Number(req.query.idx);
            await this.postService.delete(idx);

            successHandler(res, 200, '게시글 삭제 성공');
        } catch (err) {
            ErrorHandler(res, err);
        }
    }
}