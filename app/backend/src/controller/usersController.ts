import { Request, Response } from 'express';
import UsersService from '../services/usersService';
import { genToken, validateToken } from '../utils/Token';

class UserController {
  private _users = new UsersService();

  login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    const user = await this._users.login({ email, password });
    if (!user) { return res.status(401).json({ message: 'Invalid email or password' }); }

    const userToken = genToken(user.dataValues);
    return res
      .status(200)
      .json({ userToken });
  };

  role = (req: Request, res: Response) => {
    const { userToken } = req.body;
    const token = validateToken(userToken);
    if (token) {
      return res.status(200).json({ role: token.role });
    }
    return res.status(401).json({ message: 'Token must be a valid token' });
  };
}

export default UserController;
