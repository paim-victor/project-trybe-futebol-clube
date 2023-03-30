import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';

class Users extends Model {
  declare id: number;
  declare teamName: string;
  declare email: string;
  declare password: string;
}

Users.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  username: { type: STRING },
  role: { type: STRING },
  email: { type: STRING },
  password: { type: STRING },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default Users;
