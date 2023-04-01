import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';

class Users extends Model {
  declare id: number;
  declare username: string;
  declare email: string;
  declare password: string;
  declare role: string;
}

Users.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  username: { type: STRING, allowNull: false },
  role: { type: STRING, allowNull: false },
  email: { type: STRING, allowNull: false },
  password: { type: STRING, allowNull: false },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default Users;
