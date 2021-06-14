import { Router } from 'express';
import CommentController from '../../controller/comment.controller';
import { authHost, authUser } from '../../lib/middleware/auth.middleware';

const router: Router = Router();

const commentController: CommentController = new CommentController();

router.get('/getComments', commentController.getComments);
router.get('/:id', commentController.getComment);
router.post('/', authUser, commentController.create);
router.put('/update/:id', authUser, commentController.update);
router.delete('/delete', authUser, commentController.delete);

export default router;