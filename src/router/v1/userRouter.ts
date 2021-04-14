import { Router } from 'express';
import UserController from '../../controller/user.controller';

const router: Router = Router();

const userController: UserController = new UserController();

router.get('/', userController.getUsers);
router.post('/signup', userController.signUp);

export default router;