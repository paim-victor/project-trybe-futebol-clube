import * as jwt from 'jsonwebtoken';
import { IUser, TokenUser } from '../interfaces/Users/IUser';

class Token {
  public genToken = (user: IUser) => {
    const secret: jwt.Secret = process.env.JWT_SECRET || 'jwt_secret';
    console.log('segredo usado:', secret);
    const options: jwt.SignOptions = { expiresIn: '13d', algorithm: 'HS256' };

    const { id, username, email, role } = user;
    const token = jwt.sign({ id, username, email, role }, secret, options);
    console.log('token gerado:', token);

    return token;
  };

  public validateToken = (token: string) => {
    const tokenSecret: jwt.Secret = process.env.JWT_SECRET || 'jwt_secret';
    try {
      const user = jwt.verify(token, tokenSecret) as TokenUser;
      console.log('usuario decodificado:', user);
      return user;
    } catch (err) {
      console.error(err);
      return null;
    }
  };
}

export default Token;
