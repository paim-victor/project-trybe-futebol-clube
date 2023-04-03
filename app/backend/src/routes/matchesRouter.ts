import { Router } from 'express';
import MatchesController from '../controller/matchesController';
import matchesTokenValid from '../middlewares/matchesTokenValid';

const router = Router();

const matchesController = new MatchesController();
// const validate = new ValidUser();

router.post(
  '/',
  matchesTokenValid,
  matchesController.create,
);
router.get(
  '/',
  matchesController.getAll,
);
router.patch(
  '/:id',
  matchesTokenValid,
  matchesController.edit,
);
router.patch(
  '/:id/finish',
  matchesTokenValid,
  matchesController.finish,
);

export default router;
