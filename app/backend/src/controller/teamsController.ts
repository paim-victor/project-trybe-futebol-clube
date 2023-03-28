import { Request, Response } from 'express';
import ITeam from '../interfaces/Teams/ITeam';
import TeamService from '../services/teamsService';

class TeamController {
  private _teams = new TeamService();

  public findAll = async (
    _req: Request,
    res: Response,
  )
  : Promise<Response | void> => {
    const teams: ITeam[] = await this._teams.findAll();
    return res.status(200).json(teams);
  };
}

export default TeamController;
