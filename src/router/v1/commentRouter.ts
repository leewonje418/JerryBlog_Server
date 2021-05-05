import { Router } from 'express';
import CommentController from '../../controller/comment.controller';
import { authHost } from '../../lib/middleware/auth.middleware';

const router: Router = Router();

const commentController: CommentController = new CommentController();

router.get('/getComments', commentController.getComments);
router.get('/', commentController.getComment);
router.post('/', authHost, commentController.create);
router.put('/update', authHost, commentController.update);
router.delete('/delete', authHost, commentController.delete);

export default router;