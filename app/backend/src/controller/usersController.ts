import { Request, Response } from 'express';
import UsersService from '../services/usersService';

class LoginController {
  private _users = new UsersService();

  login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    const userToken = await this._users.login(email, password);

    return res.status(200).json({ userToken });
  };
}

export default LoginController;
