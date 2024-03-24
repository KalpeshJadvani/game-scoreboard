import {
  AddGameType,
  GameStatus,
  SummaryType,
  UpdateScoreType,
} from '../utils/types';
import { Game } from '../model/Game';
import { Team } from '../model/Team';
import { error } from '../utils/errorDefinition';
import { sleep } from '../utils/utility';

class ScoreBoard implements ScoreBoard {
  private games: Game[];
  constructor() {
    this.games = [];
  }

  private findGameById(gameId: number) {
    return this.games.find((game) => game.getGameId() === gameId);
  }

  private filterInProgressGames(status: GameStatus) {
    return this.games.filter((game) => game.getGameStatus() === status);
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

    // this is not ideal solution but in safer side
    // the start time will not be the same for each game
    sleep(50);

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
    game.addGameScore({ homeTeamScore, awayTeamScore });
  }

  getSummary(): SummaryType {
    // filtering details which games are started
    const inProgressMatches = this.filterInProgressGames(GameStatus.STARTED);

    const sortBasedOnScore = inProgressMatches.sort((game1, game2) => {
      if (game2.getTotalScore() === game1.getTotalScore()) {
        // once we have same total score for two matches then we need to check
        // from each team of the match who has same score and become tie of match
        return game2.getStartTime().getTime() - game1.getStartTime().getTime();
      }
      return game2.getTotalScore() - game1.getTotalScore();
    });
    // try to make simple formate but we can enhance accordingly
    return sortBasedOnScore.map((game) => {
      return {
        gameId: game.getGameId(),
        homeTeam: game.getHomeTeamName(),
        awayTeam: game.getAwayTeamName(),
        homeTeamScore: game.getHomeTeamScore(),
        awayTeamScore: game.getAwayTeamScore(),
        gameStatus: game.getGameStatus(),
        startTime: game.getStartTime(),
        totalScore: game.getTotalScore(),
      };
    });
  }
}
// exporting type in case do we need to use while getting summery
export { GameStatus, SummaryType };
export default ScoreBoard;
