import UsersModel from '../database/models/usersModel';
import Validates from '../utils/Validates';

class UserService {
  constructor(private _users = UsersModel) { }

  login = async ({ email, password }: { email: string, password: string }) => {
    const user = await this._users.findOne({ where: { email } });
    if (!user) return null;

    const validatePassword = Validates.validatePassword(password, user.dataValues.password);
    if (!validatePassword) return null;
    return user;
  };
}

export default UserService;
