import { ModelStatic } from 'sequelize';
import TeamModel from '../database/models/teamsModel';
import { ITeam, ITeamID } from '../interfaces/Teams/ITeam';

class TeamService {
  private _teams: ModelStatic<TeamModel> = TeamModel;

  public getAll = async (): Promise<ITeam[]> => {
    const allTeams: ITeam[] = await this._teams.findAll();
    return allTeams;
  };

  public getById = async (id: number) => {
    const teamForId: ITeamID | null = await this._teams.findOne({ where: { id } });
    return teamForId;
  };
}

export default TeamService;
