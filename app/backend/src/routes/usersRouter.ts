import { Router } from 'express';
// import { validEmail, validPassword } from '../middlewares/validUser';
import ValidUser from '../middlewares/ValidUser';

import UserController from '../controller/usersController';

const router = Router();

const userController = new UserController();
const valid = new ValidUser();

router.post('/', valid.validateLogin, userController.login);
console.log('login route:', router);
router.get('/role', valid.validToken, userController.role);

export default router;
