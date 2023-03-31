import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { IUser, TokenUser } from '../interfaces/Users/IUser';

dotenv.config();

const secret = process.env.JWT_SECRET || 'flamengo';

console.log('JWT Secret:', secret);

const genToken = (payload: IUser) => {
  const token = jwt.sign(payload, secret);
  console.log('Generated token:', token);
  return token;
};

const validateToken = (token: string) => {
  console.log('Received token:', token);
  try {
    const decod = jwt.verify(token, secret) as TokenUser;
    console.log('Decoded token:', decod);
    return decod;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export { genToken, validateToken };
