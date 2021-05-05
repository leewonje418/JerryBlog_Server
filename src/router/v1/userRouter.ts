import { Router } from 'express';
import { authUser } from 'src/lib/middleware/auth.middleware';
import UserController from '../../controller/user.controller';

const router: Router = Router();

const userController: UserController = new UserController();

router.get('/getUsers', userController.getUsers);
router.get('/my', authUser, userController.getUser);
router.post('/signup', userController.signUp);
router.put('/updateName', authUser, userController.updateName);
router.delete('/delete', authUser, userController.delete);

export default router;