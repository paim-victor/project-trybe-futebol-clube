interface IEdit {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

interface ICreate extends IEdit {
  homeTeamId: number;
  awayTeamId: number;
}

interface INewMatch extends ICreate {
  id: number;
  status?: number;
  message?: string;
  inProgress: boolean;
}

interface IMatchFull {
  id: number;
  homeTeamId: number;
  awayTeamId: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export { ICreate, IEdit, INewMatch, IMatchFull };
