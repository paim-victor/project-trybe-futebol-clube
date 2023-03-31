interface IUser {
  email: string,
  password: string,
  role: string,
  id: number,
  username: string,
}

interface TokenUser extends IUser {
  role: string;
}

export { IUser, TokenUser };
