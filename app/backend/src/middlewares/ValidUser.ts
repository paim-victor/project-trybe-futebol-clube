import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import { validateToken } from '../utils/Token';

class ValidUser {
  public validateLogin = (req: Request, res: Response, next:NextFunction) => {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!password) {
      return res.status(400)
        .json({ message: 'All fields must be filled' });
    }
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!email.match(regex) || !email) {
      return res.status(401)
        .json({ message: 'Invalid email or password' });
    }
    if (password.length < 6) {
      return res.status(401)
        .json({ message: 'Invalid email or password' });
    }
    return next();
  };

  public validToken = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    console.log('AUTH: ', authorization);
    if (!authorization) {
      return res
        .status(401)
        .json({ message: 'Token not found' });
    }
    try {
      const user = validateToken(authorization);
      console.log('USER:', user);
      req.body.userToken = user;
      return next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: 'Token must be a valid token' });
    }
  };
}

export default ValidUser;
