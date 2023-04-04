import Matches from '../database/models/matchesModel';
import Teams from '../database/models/teamsModel';
import ILeaderboard from '../interfaces/Leadboard/ILeadboard';
import { IMatchFull } from '../interfaces/Matches/IMatches';

class LButils {
  static teamLB = async (id:number, argumento:string) => {
    const objeto = {
      name: '',
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: '',
    };
    const teams = await Teams.findOne({ where: { id } });
    if (teams) objeto.name = teams?.teamName;
    const matches = await Matches.findAll({ where: { [argumento]: id, inProgress: false } });
    objeto.totalGames = matches.length;
    return { objeto, matches };
  };

  static allCalculate = (objeto:ILeaderboard, matches:IMatchFull[]) => {
    const response = matches.reduce((accumulator, currentValue) => {
      if (currentValue.homeTeamGoals > currentValue.awayTeamGoals) {
        accumulator.totalVictories += 1; accumulator.totalPoints += 3;
      }
      if (currentValue.homeTeamGoals === currentValue.awayTeamGoals) {
        accumulator.totalDraws += 1; accumulator.totalPoints += 1;
      }
      if (currentValue.homeTeamGoals < currentValue.awayTeamGoals) {
        accumulator.totalLosses += 1;
      }
      accumulator.goalsFavor += currentValue.homeTeamGoals;
      accumulator.goalsOwn += currentValue.awayTeamGoals;
      accumulator.goalsBalance = accumulator.goalsFavor - accumulator.goalsOwn;
      accumulator.efficiency = (((accumulator.totalPoints / (accumulator.totalGames * 3))) * 100)
        .toFixed(2);
      return accumulator;
    }, objeto);
    return response;
  };

  static calcAwayTotals = (objeto:ILeaderboard, matches:IMatchFull[]) => {
    const response = matches.reduce((accumulator, currentValue) => {
      if (currentValue.awayTeamGoals > currentValue.homeTeamGoals) {
        accumulator.totalVictories += 1;
        accumulator.totalPoints += 3;
      }
      if (currentValue.awayTeamGoals === currentValue.homeTeamGoals) {
        accumulator.totalDraws += 1;
        accumulator.totalPoints += 1;
      }
      if (currentValue.awayTeamGoals < currentValue.homeTeamGoals) {
        accumulator.totalLosses += 1;
      }
      accumulator.goalsFavor += currentValue.awayTeamGoals;
      accumulator.goalsOwn += currentValue.homeTeamGoals;
      accumulator.goalsBalance = accumulator.goalsFavor - accumulator.goalsOwn;
      accumulator.efficiency = (((accumulator.totalPoints / (accumulator.totalGames * 3))) * 100)
        .toFixed(2); return accumulator;
    }, objeto); return response;
  };

  public static LBsort = (leaderBoard:ILeaderboard[]) => leaderBoard.sort((b, a) => {
    if (a.totalPoints === b.totalPoints) {
      if (a.goalsBalance === b.goalsBalance) {
        return a.goalsFavor - b.goalsFavor;
      } return a.goalsBalance - b.goalsBalance;
    }
    return a.totalPoints - b.totalPoints;
  });

  static LBjoin = (LBhome: ILeaderboard[], LBaway: ILeaderboard[]) => {
    const result:ILeaderboard[] = LBhome;
    result.forEach((response, index) => {
      LBaway.forEach((away) => {
        if (response.name === away.name) {
          result[index].totalPoints += away.totalPoints; result[index]
            .totalGames += away.totalGames;
          result[index].totalVictories += away.totalVictories;
          result[index].totalDraws += away.totalDraws; result[index]
            .totalLosses += away.totalLosses;
          result[index].goalsFavor += away.goalsFavor; result[index].goalsOwn += away.goalsOwn;
          result[index].efficiency = (
            ((result[index].totalPoints / (result[index].totalGames * 3))) * 100)
            .toFixed(2);
          result[index].goalsBalance += away.goalsBalance;
        }
      });
    });
    return result;
  };
}

export default LButils;
