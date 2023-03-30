import { NextFunction, Request, Response } from 'express';

const validEmail = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  // const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  if (!email) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  next();
};

const validPassword = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  next();
};

export { validEmail, validPassword };
