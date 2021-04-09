import { Router } from 'express';
import PostController from '../../controller/post.controller';
import { auth } from '../../lib/middleware/auth.middleware';

const router: Router = Router();

const postController = new PostController();

router.get('/', postController.getPosts);
router.post('/', auth, postController.create);

export default router;