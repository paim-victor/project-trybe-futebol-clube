import TeamsModel from '../database/models/teamsModel';
import LButils from '../utils/LButils';

class LBService {
  constructor(private model = TeamsModel) { }

  leaderboard = async (argumento:string) => {
    const array = [];
    for (let index = 1; index <= 16; index += 1) {
      array.push(LButils.teamLB(index, argumento));
    }
    const res = await Promise.all(array);
    if (argumento === 'homeTeamId') {
      const lb = res.map(({ objeto, matches }) => LButils
        .allCalculate(objeto, matches));
      const sortedLeaderBoard = LButils.LBsort(lb);
      return sortedLeaderBoard;
    }
    if (argumento === 'awayTeamId') {
      const lb = res.map(({ objeto, matches }) => LButils
        .calcAwayTotals(objeto, matches));
      const sortedLeaderBoard = LButils.LBsort(lb);
      return sortedLeaderBoard;
    }
  };

  public allLB = async () => {
    const homeBoard = await this.leaderboard('homeTeamId');
    const awayBoard = await this.leaderboard('awayTeamId');
    if (homeBoard && awayBoard) {
      const leaderBoard = LButils.LBjoin(homeBoard, awayBoard);
      const sortedLeaderBoard = LButils.LBsort(leaderBoard);
      return sortedLeaderBoard;
    }
  };
}

export default LBService;
