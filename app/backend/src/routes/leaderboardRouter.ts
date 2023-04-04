import { Router } from 'express';

import LeaderboardController from '../controller/leaderboardController';

const router = Router();

const leaderboardController = new LeaderboardController();

router.get('/home', leaderboardController.homeLB);
router.get('/away', leaderboardController.awayLB);
router.get('/', leaderboardController.allLB);

export default router;
