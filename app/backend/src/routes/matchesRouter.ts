import { Router } from 'express';
import MatchesController from '../controller/matchesController';
import ValidUser from '../middlewares/ValidUser';

const router = Router();

const matchesController = new MatchesController();
const validate = new ValidUser();

router.post(
  '/',
  validate.validToken,
  matchesController.create,
);
router.get(
  '/',
  matchesController.getAll,
);
router.patch(
  '/:id',
  validate.validToken,
  matchesController.edit,
);
router.patch(
  '/:id/finish',
  validate.validToken,
  matchesController.finish,
);

export default router;
