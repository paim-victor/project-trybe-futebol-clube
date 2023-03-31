import * as jwt from 'jsonwebtoken';
import { TokenUser } from '../interfaces/Users/IUser';
import 'dotenv/config';

const secret = process.env.JWT_SECRET || '';

console.log('JWT Secret:', secret);

const JWTConfig: jwt.SignOptions = {
  algorithm: 'HS256',
};

const genToken = (payload: unknown): string => {
  const token = jwt.sign({ payload }, secret, JWTConfig);
  console.log('Generated token:', token); // Adicionando console.log
  return token;
};

const validateToken = (token: string) => {
  console.log('Received token:', token); // Adicionando console.log
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, secret) as TokenUser;
    console.log('Decoded token:', decoded); // Adicionando console.log
    return decoded;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export { genToken, validateToken };
