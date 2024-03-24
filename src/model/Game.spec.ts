import { GameStatus } from '../utils/types';
import { Game } from './Game';
import { Team } from './Team';

describe('Game', () => {
  let homeTeam: Team;
  let awayTeam: Team;
  let game: Game;

  beforeEach(() => {
    homeTeam = new Team({ name: 'Argentina' });
    awayTeam = new Team({ name: 'Australia' });
    game = new Game(homeTeam, awayTeam, 55);
  });

  describe('constructor', () => {
    it('should create a Game instance with home and away teams and gameId', () => {
      expect(game.getHomeTeamName()).toBe('Argentina');
      expect(game.getAwayTeamName()).toBe('Australia');
      expect(game.getGameId()).toBe(55);
    });

    it('should calculate total score based on home and away team scores', () => {
      expect(game.getTotalScore()).toBe(0);
    });

    it('should get game status not started ', () => {
      expect(game.getGameStatus()).toBe(GameStatus.NOT_STARTED);
    });

    it('should get game status started ', () => {
      game.setGameStatus(GameStatus.STARTED);
      expect(game.getGameStatus()).toBe(GameStatus.STARTED);
    });

    it('should get game status finished ', () => {
      game.setGameStatus(GameStatus.FINISHED);
      expect(game.getGameStatus()).toBe(GameStatus.FINISHED);
    });
  });
});
