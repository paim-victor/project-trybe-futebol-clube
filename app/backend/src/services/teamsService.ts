import { ModelStatic } from 'sequelize';
import TeamModel from '../database/models/teamsModel';
import ITeam from '../interfaces/Teams/ITeam';

class TeamService {
  private _teams: ModelStatic<TeamModel> = TeamModel;

  public findAll = async (): Promise<ITeam[]> => {
    const allTeams: ITeam[] = await this._teams.findAll();
    return allTeams;
  };
}

export default TeamService;
