import { BOOLEAN, INTEGER, Model } from 'sequelize';
import db from '.';
import teams from './teamsModel';

class Matches extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awaitTeamId: number;
  declare awaitTeamGoals: number;
  declare inProgress: boolean;
}

Matches.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeamId: {
    type: INTEGER,
    allowNull: false,
    field: 'home_team_id',
    references: { key: 'id', model: 'teams' } },
  homeTeamGoals: { type: INTEGER, allowNull: false },
  awayTeamId: {
    type: INTEGER,
    allowNull: false,
    field: 'away_team_id',
    references: { key: 'id', model: 'teams' } },
  awayTeamGoals: { type: INTEGER, allowNull: false },
  inProgress: { type: BOOLEAN, allowNull: false },

}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Matches.belongsTo(teams, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Matches.belongsTo(teams, { foreignKey: 'awayTeamId', as: 'awayTeam' });

export default Matches;
