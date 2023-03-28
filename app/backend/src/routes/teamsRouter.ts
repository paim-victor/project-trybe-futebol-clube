import { Router } from 'express';

import TeamController from '../controller/teamsController';

const router = Router();

const teamController = new TeamController();

router.get('/', teamController.findAll);

export default router;
