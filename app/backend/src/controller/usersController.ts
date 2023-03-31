import { Request, Response } from 'express';
import UsersService from '../services/usersService';
import Token from '../utils/Token';

class LoginController {
  private _users = new UsersService();

  login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    const user = await this._users.login({ email, password });
    if (!user) { return res.status(401).json({ message: 'Invalid email or password' }); }

    const token = new Token();
    const userToken = token.genToken(user.dataValues);
    return res
      .status(200)
      .json({ userToken });
  };

  role = (req: Request, res: Response) => {
    const { user } = req.body;
    const { role } = user;
    return res
      .status(200)
      .json({ role });
  };
}

export default LoginController;
