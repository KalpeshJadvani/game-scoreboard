import { GameStatus } from '../utils/types';
import { Team } from './Team';

export class Game {
  private homeTeam: Team;
  private awayTeam: Team;
  private homeTeamScore: number;
  private awayTeamScore: number;
  private gameId: number;
  private gameStatus: GameStatus;

  constructor(homeTeam: Team, awayTeam: Team, gameId: number) {
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
    this.gameId = gameId;
    // while initialize game default score o - o
    this.homeTeamScore = 0;
    this.awayTeamScore = 0;
    this.gameStatus = GameStatus.NOT_STARTED;
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

  setGameStatus(status: GameStatus) {
    this.gameStatus = status;
  }

  getGameStatus() {
    return this.gameStatus;
  }

  addGameScore(homeTeamScore: number, awayTeamScore: number) {
    this.homeTeamScore = this.homeTeamScore + homeTeamScore;
    this.awayTeamScore = this.awayTeamScore + awayTeamScore;
  }
}
