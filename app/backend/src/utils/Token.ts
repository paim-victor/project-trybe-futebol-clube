import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { IUser, TokenUser } from '../interfaces/Users/IUser';

dotenv.config();
// contribuição Thiago Durante
const secret = process.env.JWT_SECRET || 'jwt_secret';

console.log('JWT Secret:', secret);
const options: jwt.SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const genToken = (payload: IUser) => {
  const token = jwt.sign(payload, secret, options);
  return token;
};

const validateToken = (token: string) => {
  try {
    const decod = jwt.verify(token, secret) as TokenUser;
    return decod;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export { genToken, validateToken };
