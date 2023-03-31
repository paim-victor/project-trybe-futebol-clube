interface IUser {
  id: number;
  email: string;
  password: string;
  role: string;
  username: string;
}

interface TokenUser extends IUser {
  role: string;
}

export { IUser, TokenUser };
