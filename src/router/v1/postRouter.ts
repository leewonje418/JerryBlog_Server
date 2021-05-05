import { Router } from 'express';
import PostController from '../../controller/post.controller';
import { authHost } from '../../lib/middleware/auth.middleware';

const router: Router = Router();

const postController: PostController = new PostController();

router.get('/getPosts', postController.getPosts);
router.get('/', postController.getPost);
router.post('/', authHost, postController.create);
router.put('/update', authHost, postController.update);
router.delete('/delete', authHost, postController.delete);

export default router;