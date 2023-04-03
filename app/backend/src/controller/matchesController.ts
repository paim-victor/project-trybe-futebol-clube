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

  finish = async (req: Request, res: Response): Promise<Response | void> => {
    const { id } = req.params;
    await this._matches
      .finish(Number(id));
    return res
      .status(200)
      .json({ message: 'Finish' });
  };

  edit = async (req: Request, res: Response):Promise<Response | void> => {
    const { id } = req.params;
    await this._matches.edit(Number(id), req.body);
    return res
      .status(200)
      .json({ message: 'Altered' });
  };

  public create = async (req: Request, res: Response) => {
    const match = req.body;

    if (match.homeTeamId === match.awayTeamId) {
      return res
        .status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    const newMatch = await this._matches.create(match);
    if (newMatch.message) return res.status(404).json({ message: newMatch.message });
    return res
      .status(201)
      .json(newMatch);
  };
}

export default MatchesController;
