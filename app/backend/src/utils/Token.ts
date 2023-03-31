import * as jwt from 'jsonwebtoken';
import { IUser, TokenUser } from '../interfaces/Users/IUser';

class Token {
  public genToken = (user: IUser) => {
    const secret: jwt.Secret = process.env.JWT_SECRET || 'flamengo';
    const options: jwt.SignOptions = { expiresIn: '13d', algorithm: 'HS256' };

    const { id, email, role } = user;
    const token = jwt.sign({ id, email, role }, secret, options);

    return token;
  };

  public validateToken = (token: string) => {
    const tokenSecret: jwt.Secret = process.env.JWT_SECRET || 'flamengo';
    try {
      const user = jwt.verify(token, tokenSecret) as TokenUser;
      return user;
    } catch (err) {
      console.error(err);
      return null;
    }
  };
}

export default Token;
