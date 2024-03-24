import { AddGameType, GameStatus, UpdateScoreType } from '../utils/types';
import { Game } from '../model/Game';
import { Team } from '../model/Team';
import { error } from '../utils/errorDefinition';

class ScoreBoard implements ScoreBoard {
  private games: Game[];
  constructor() {
    this.games = [];
  }

  private findGameById(gameId: number) {
    return this.games.find((game) => game.getGameId() === gameId);
  }

  private updateGameStatus(gameId: number, status: GameStatus) {
    const game = this.findGameById(gameId);
    if (!game) {
      throw error.INVALID_GAME_ID;
    }

    game.setGameStatus(status);
  }

  addGame({ gameId, homeTeam, awayTeam }: AddGameType) {
    if (!homeTeam || !awayTeam || gameId < 0 || gameId === undefined) {
      throw error.REQUIRED_TEAM_DATA;
    }

    // we are not allowing to add the game if that exist
    const gameIfExist = this.findGameById(gameId);
    if (gameIfExist) {
      throw error.GAME_ID_IS_EXIST;
    }

    const homeTeamDetails = new Team({ name: homeTeam });
    const awayTeamDetails = new Team({ name: awayTeam });
    const game = new Game(homeTeamDetails, awayTeamDetails, gameId);

    this.games.push(game);
  }

  startGame(gameId: number) {
    this.updateGameStatus(gameId, GameStatus.STARTED);
  }

  finishedGame(gameId: number) {
    this.updateGameStatus(gameId, GameStatus.FINISHED);
  }

  getGameStatus(gameId: number) {
    const game = this.findGameById(gameId);
    if (!game) {
      throw error.INVALID_GAME_ID;
    }
    return game.getGameStatus();
  }

  updateScore(score: UpdateScoreType) {
    const { gameId, homeTeamScore, awayTeamScore } = score;
    const game = this.findGameById(gameId);
    if (!game) {
      throw error.INVALID_GAME_ID;
    }

    const status = game.getGameStatus();
    if (status === GameStatus.NOT_STARTED || status === GameStatus.FINISHED) {
      throw error.UNABLE_TO_UPDATE_SCORE;
    }
    // allowing 0 score be because any of the team could has 0
    if (awayTeamScore < 0 || homeTeamScore < 0) {
      throw error.INVALID_ENTER_SCORE;
    }
    // Updating the score of game after most of validation
    game.addGameScore(awayTeamScore, homeTeamScore);
  }
}

export default ScoreBoard;
