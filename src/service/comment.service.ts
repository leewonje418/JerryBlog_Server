import Comment from '../entity/comment';
import CommentDTO from '../dto/comment.dto';
import CommentRepository from '../repository/comment.repository';
import { getCustomRepository } from 'typeorm';
import AuthService from './auth.service';
import HttpError from 'src/error/httpError';
import PostService from './post.service';

export default class CommentService {
    private readonly authService: AuthService;
    private readonly postService: PostService;

    constructor() {
        this.authService = new AuthService();
        this.postService = new PostService();
    }

    getComments = async (): Promise<Comment[]> => {
        const commentRepository: CommentRepository = getCustomRepository(CommentRepository);
        const comments: Comment[] = await commentRepository.find();
        return comments;
    }

    getComment = async (idx: number): Promise<Comment | undefined> => {
        const commentRepository: CommentRepository = getCustomRepository(CommentRepository);
        const comment: Comment | undefined = await commentRepository.findOne(idx);       
        return comment;
    }

    create = async (commentRequest: CommentDTO): Promise<Comment> => {
        const commentRepository: CommentRepository = getCustomRepository(CommentRepository);
        const { content, userEmail, postIdx  } = commentRequest;

        const user = await this.authService.getUser(userEmail);
        if (user === undefined) {
            throw new HttpError(404, '유저 없음');
        }

        const post = await this.postService.getPost(postIdx);
        if (post === undefined) {
            throw new HttpError(404, '게시글 없음');
        }

        const comment: Comment = new Comment();
        comment.content = content;
        comment.user = user;
        comment.post = post;

        const newComment: Comment = await commentRepository.save(comment);
        
        return newComment;
    }

    update = async (id: number, commentRequest: CommentDTO): Promise<Comment> => {
        const commentRepository: CommentRepository = getCustomRepository(CommentRepository);
        const { content, userEmail, postIdx  } = commentRequest;

        const user = await this.authService.getUser(userEmail);
        if (user === undefined) {
            throw new HttpError(404, '유저 없음');
        }

        const post = await this.postService.getPost(postIdx);
        if (post === undefined) {
            throw new HttpError(404, '게시글 없음');
        }

        const comment: Comment = new Comment();
        comment.idx = id;
        comment.content = content;
        comment.user = user;
        comment.post = post;

        const updateComment: Comment = await commentRepository.save(comment);
        
        return updateComment;
    }

    delete = async (idx: number) => {
        const commentRepository: CommentRepository = getCustomRepository(CommentRepository);
        await commentRepository.delete(idx);
    }
}