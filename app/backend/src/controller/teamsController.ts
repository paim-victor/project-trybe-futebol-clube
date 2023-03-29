import { Request, Response } from 'express';
import { ITeam, ITeamID } from '../interfaces/Teams/ITeam';
import TeamService from '../services/teamsService';

class TeamController {
  private _teams = new TeamService();

  public getAll = async (
    req: Request,
    res: Response,
  )
  : Promise<Response | void> => {
    const teams: ITeam[] = await this._teams.getAll();
    return res.status(200).json(teams);
  };

  public getById = async (
    req: Request,
    res: Response,
  )
  : Promise<Response | void> => {
    const { id } = req.params;
    const team: ITeamID | null = await this._teams.getById(Number(id));
    return res.status(200).json(team);
  };
}

export default TeamController;
