import { Router } from 'express';

import TeamController from '../controller/teamsController';

const router = Router();

const teamController = new TeamController();

router.get('/', teamController.getAll);
router.get('/:id', teamController.getById);

export default router;
