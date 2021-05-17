import { Router } from 'express';

import postRouter from './postRouter';
import userRouter from './userRouter';
import authRouter from './authRouter';
import searchRouter from './searchRouter';
import commentRouter from './commentRouter';

const router: Router = Router();

router.use('/post', postRouter);
router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/search', searchRouter);
router.use('/comment', commentRouter);

export default router;