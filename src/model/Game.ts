import { Team } from './Team';

export class Game {
  protected homeTeam: Team;
  protected awayTeam: Team;
  protected homeTeamScore: number;
  protected awayTeamScore: number;
  protected gameId: number;

  constructor(homeTeam: Team, awayTeam: Team, gameId: number) {
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
    this.gameId = gameId;
    // while initialise game default score o - o
    this.homeTeamScore = 0;
    this.awayTeamScore = 0;
  }

  getGameId() {
    return this.gameId;
  }

  getHomeTeamName() {
    return this.homeTeam.getName();
  }

  getAwayTeamName() {
    return this.awayTeam.getName();
  }

  getHomeTeamScore() {
    return this.homeTeamScore;
  }
  getAwayTeamScore() {
    return this.awayTeamScore;
  }

  getTotalScore() {
    return this.getHomeTeamScore() + this.getAwayTeamScore();
  }
}
