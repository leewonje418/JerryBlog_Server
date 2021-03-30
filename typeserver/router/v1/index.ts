import { Router } from 'express';

import postRouter from './postRouter';
import userRouter from './userRouter';
import authRouter from './authRouter';

const router: Router = Router();

router.use('/post', postRouter);
router.use('/user', userRouter);
router.use('/auth', authRouter);

export default router;