import * as bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { ModelStatic } from 'sequelize';
import UsersModel from '../database/models/usersModel';

class UserService {
  private _users: ModelStatic<UsersModel> = UsersModel;

  public getEmail = async (email: string): Promise<UsersModel | null> => {
    const emailSave = await this._users.findOne({ where: { email } });
    return emailSave;
  };

  public login = async (email: string, password: string): Promise<string | null> => {
    const emailData = await this.getEmail(email);

    if (!emailData) return null;

    if (!bcrypt.compareSync(password, emailData.password)) return null;

    return sign({ email, password }, process.env.JWT_SECRET as string);
  };
}

export default UserService;
