import { Team } from '../model/Team';
import { error } from '../utils/errorDefinition';
import { GameStatus } from '../utils/types';
import ScoreBoard from './ScoreBoard';

describe('ScoreBoard', () => {
  let scoreBoard: ScoreBoard;
  let homeTeam: Team;
  let awayTeam: Team;
  beforeEach(() => {
    scoreBoard = new ScoreBoard();
    homeTeam = new Team({ name: 'Spain' });
    awayTeam = new Team({ name: 'Brazil' });
  });

  describe('addGame', () => {
    it('should add a new game with provided teams and gameId', () => {
      scoreBoard.addGame({
        homeTeam: 'Spain',
        awayTeam: 'Brazil',
        gameId: 1,
      });

      expect(scoreBoard['games']).toHaveLength(1);
      expect(scoreBoard.getGameStatus(1)).toBe(GameStatus.NOT_STARTED);
    });

    it('should throw an error if required data is missing', () => {
      expect(() =>
        scoreBoard.addGame({ homeTeam: '', awayTeam: 'Brazil', gameId: 1 })
      ).toThrow(error.REQUIRED_TEAM_DATA);
    });

    it('should throw an error if game is already added', () => {
      scoreBoard.addGame({
        homeTeam: 'Spain',
        awayTeam: 'Brazil',
        gameId: 1,
      });
      expect(() =>
        scoreBoard.addGame({ homeTeam: 'Spain', awayTeam: 'Brazil', gameId: 1 })
      ).toThrow(error.GAME_ID_IS_EXIST);
    });
  });

  describe('start game and finished game', () => {
    it('should get status game started', () => {
      scoreBoard.addGame({
        homeTeam: 'Spain',
        awayTeam: 'Brazil',
        gameId: 12,
      });
      scoreBoard.startGame(12);

      expect(scoreBoard.getGameStatus(12)).toBe(GameStatus.STARTED);
    });

    it('should get status game finished', () => {
      scoreBoard.addGame({
        homeTeam: 'Spain',
        awayTeam: 'Brazil',
        gameId: 12,
      });
      expect(scoreBoard.getGameStatus(12)).toBe(GameStatus.NOT_STARTED);
      scoreBoard.startGame(12);
      expect(scoreBoard.getGameStatus(12)).toBe(GameStatus.STARTED);
      scoreBoard.finishedGame(12);
      expect(scoreBoard.getGameStatus(12)).toBe(GameStatus.FINISHED);
    });

    it('should throw an error if game id not matching', () => {
      scoreBoard.addGame({
        homeTeam: 'Spain',
        awayTeam: 'Brazil',
        gameId: 33,
      });
      expect(scoreBoard.getGameStatus(33)).toBe(GameStatus.NOT_STARTED);
      scoreBoard.startGame(33);
      expect(scoreBoard.getGameStatus(33)).toBe(GameStatus.STARTED);
      scoreBoard.finishedGame(33);

      expect(() => scoreBoard.finishedGame(44)).toThrow(error.INVALID_GAME_ID);
    });
  });
});
