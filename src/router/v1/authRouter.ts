import { Router } from 'express';
import AuthController from '../../controller/auth.controller';

const router: Router = Router();

const authController: AuthController = new AuthController();

router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/emailDuplicate', authController.emailDuplicate);
router.post('/sendEmail', authController.sendEmail);
router.post('/checkEmail', authController.checkEmailCode);

export default router;