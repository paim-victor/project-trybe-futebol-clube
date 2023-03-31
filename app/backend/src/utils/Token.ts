import * as jwt from 'jsonwebtoken';
import { IUser, TokenUser } from '../interfaces/Users/IUser';
import 'dotenv/config';

const secret = process.env.JWT_SECRET || 'euOdeioJWT';

console.log('JWT Secret:', secret);

const JWTConfig: jwt.SignOptions = {
  algorithm: 'HS256',
};

const genToken = (payload: IUser): string => {
  const token = jwt.sign({ payload }, secret, JWTConfig);
  console.log('Generated token:', token);
  return token;
};

const validateToken = (token: string) => {
  console.log('Received token:', token);
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, secret) as TokenUser;
    console.log('Decoded token:', decoded);
    return decoded;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export { genToken, validateToken };
