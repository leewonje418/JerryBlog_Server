import { Request, Response } from 'express';

import { successHandler } from '../lib/handler/httpSuccessHandler';
import ErrorHandler from '../lib/handler/httpErrorHandler';

import CommentDTO from '../dto/comment.dto';
import CommentService from '../service/comment.service';
import Comment from '../entity/comment';

export default class CommentController {
    private readonly commentService: CommentService;

    constructor() {
        this.commentService = new CommentService();
    }

    getComments = async(req: Request, res: Response) => {
        try {
            const comments: Comment[] = await this.commentService.getComments();
            successHandler(res, 200, '덧글 전체 불러오기 성공', comments);
        } catch (err) {
            ErrorHandler(res, err);
        }
    }

    getComment = async(req: Request, res: Response) => {
        try {
            const idx: number = Number(req.params.id);
            const comment: Comment | undefined = await this.commentService.getComment(idx);
            successHandler(res, 200, '게시글 불러오기 성공', comment);
        } catch (err) {
            ErrorHandler(res, err);
        }
    }

    create = async(req: Request, res: Response) => {
        try {
            const { body } = req;
            const commentRequest: CommentDTO = new CommentDTO(body);

            await commentRequest.validate();
            await this.commentService.create(commentRequest);
            
            successHandler(res, 200, '덧글 게시 성공');
        } catch (err) {
            ErrorHandler(res, err);
        }
    }

    update = async(req: Request, res: Response) => {
        try {
            // post_id
            const idx: number = Number(req.params.id);
            const { body } = req;
            const postRequest: CommentDTO = new CommentDTO(body);

            await postRequest.validate();
            await this.commentService.update(idx, postRequest);

            successHandler(res, 200, '덧글 수정 성공');
        } catch (err) {
            ErrorHandler(res, err);
        }
    }

    delete = async(req: Request, res: Response) => {
        try {
            // post_id
            const idx: number = Number(req.query.id);
            await this.commentService.delete(idx);

            successHandler(res, 200, '덧글 삭제 성공');
        } catch (err) {
            ErrorHandler(res, err);
        }
    }
}