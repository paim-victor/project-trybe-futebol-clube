import { ModelStatic } from 'sequelize';
import MatchesModel from '../database/models/matchesModel';
import teams from '../database/models/teamsModel';
import IError from '../interfaces/Error/IError';
import { ICreate, IEdit, INewMatch } from '../interfaces/Matches/IMatches';

class MatchesService {
  private _matches: ModelStatic<MatchesModel> = MatchesModel;

  getAll = async () => {
    const matches = await this._matches.findAll(
      { include: [{ model: teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: teams, as: 'awayTeam', attributes: ['teamName'] },
      ] },
    );
    return matches;
  };

  getInProgress = async (inProgress: boolean) => {
    const matches = await this._matches.findAll({ where: { inProgress },
      include: [{ model: teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ] });
    return matches;
  };

  finish = async (id: number): Promise<number[] | undefined> => {
    const matches = await this._matches.update(
      { inProgress: false },
      { where: { id },
      },
    );
    return matches;
  };

  edit = async (id: number, body: IEdit): Promise<number[] | undefined> => {
    const match = await this._matches.update(
      {
        homeTeamGoals: body.homeTeamGoals,
        awayTeamGoals: body.awayTeamGoals,
      },
      {
        where: { id },
      },
    );
    return match;
  };

  create = async (match: ICreate): Promise<INewMatch | IError> => {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = match;
    const homeTeam = await this._matches.findOne({ where: { homeTeamId } });
    const awayTeam = await this._matches.findOne({ where: { awayTeamId } });

    if (!awayTeam || !homeTeam) return { status: 404, message: 'There is no team with such id!' };

    const newMatch = await this._matches
      .create({ homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress: true });
    return newMatch;
  };
}
export default MatchesService;
