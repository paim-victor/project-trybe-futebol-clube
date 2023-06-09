import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const secret:jwt.Secret = process.env.JWT_SECRET || 'jwt_secret';

const validToken = (token: string) => jwt.verify(token, secret);

const matchesTokenValid = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res
      .status(401)
      .json({ message: 'Token not found' });
  }
  try {
    const user = validToken(authorization);
    req.body.userToken = user;
    return next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: 'Token must be a valid token' });
  }
};

export default matchesTokenValid;
