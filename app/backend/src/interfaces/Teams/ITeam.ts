interface ITeam {
  id: number,
  teamName: string,
}

interface ITeamID extends ITeam {
  id: number;
}

export { ITeam, ITeamID };
