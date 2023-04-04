import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) {}

  public homeLB = async (_req: Request, res: Response) => {
    const homeLeaderboard = await this.leaderboardService.leaderboard('homeTeamId');
    return res.status(200).json(homeLeaderboard);
  };

  public awayLB = async (_req: Request, res: Response) => {
    const awayLeaderboard = await this.leaderboardService.leaderboard('awayTeamId');
    return res.status(200).json(awayLeaderboard);
  };

  public allLB = async (_req: Request, res: Response) => {
    const leaderBoard = await this.leaderboardService.allLB();
    return res.status(200).json(leaderBoard);
  };
}
