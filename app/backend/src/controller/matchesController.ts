import { Request, Response } from 'express';

import MatchesService from '../services/matchesService';

class MatchesController {
  private _matches = new MatchesService();

  getAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (inProgress === undefined) {
      const matches = await this._matches.getAll();
      return res
        .status(200)
        .json(matches);
    }
    const matches = await this._matches.getInProgress(inProgress !== 'false');
    return res
      .status(200)
      .json(matches);
  };
}

export default MatchesController;
