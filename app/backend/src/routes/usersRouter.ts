import { Router } from 'express';
import { validEmail, validPassword } from '../middlewares/validUser';

import UserController from '../controller/usersController';

const router = Router();

const userController = new UserController();

router.post('/', validEmail, validPassword, userController.login);

export default router;
