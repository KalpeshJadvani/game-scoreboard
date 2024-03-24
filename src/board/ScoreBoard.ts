import { AddGameType } from '../utils/types';
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
}

export default ScoreBoard;