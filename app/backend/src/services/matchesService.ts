import { ModelStatic } from 'sequelize';
import MatchesModel from '../database/models/matchesModel';
import teams from '../database/models/teamsModel';

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
}

export default MatchesService;
