import Comment from '../entity/comment';
import CommentDTO from '../dto/comment.dto';
import CommentRepository from '../repository/comment.repository';
import { getCustomRepository } from 'typeorm';

export default class CommentService {
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

        const comment: Comment = new Comment();
        comment.content = content;
        comment.userEmail = userEmail;
        comment.postIdx = postIdx;

        const newComment: Comment = await commentRepository.save(comment);
        
        return newComment;
    }

    update = async (id: number, commentRequest: CommentDTO): Promise<Comment> => {
        const commentRepository: CommentRepository = getCustomRepository(CommentRepository);
        const { content, userEmail, postIdx  } = commentRequest;

        const comment: Comment = new Comment();
        comment.idx = id;
        comment.content = content;
        comment.userEmail = userEmail;
        comment.postIdx = postIdx;

        const updateComment: Comment = await commentRepository.save(comment);
        
        return updateComment;
    }

    delete = async (idx: number) => {
        const commentRepository: CommentRepository = getCustomRepository(CommentRepository);
        await commentRepository.delete(idx);
    }
}