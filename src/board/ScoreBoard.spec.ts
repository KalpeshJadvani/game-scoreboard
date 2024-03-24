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
      const gameId = 1;
      scoreBoard.addGame({
        homeTeam: 'Spain',
        awayTeam: 'Brazil',
        gameId,
      });

      expect(scoreBoard['games']).toHaveLength(1);
      expect(scoreBoard.getGameStatus(gameId)).toBe(GameStatus.NOT_STARTED);
    });

    it('should throw an error if required data is missing', () => {
      expect(() =>
        scoreBoard.addGame({ homeTeam: '', awayTeam: 'Brazil', gameId: 1 })
      ).toThrow(error.REQUIRED_TEAM_DATA);
    });

    it('should throw an error if game is already added', () => {
      const gameId = 1;
      scoreBoard.addGame({
        homeTeam: 'Spain',
        awayTeam: 'Brazil',
        gameId,
      });
      expect(() =>
        scoreBoard.addGame({ homeTeam: 'Spain', awayTeam: 'Brazil', gameId })
      ).toThrow(error.GAME_ID_IS_EXIST);
    });
  });

  describe('start game and finished game', () => {
    it('should get status game started', () => {
      const gameId = 12;
      scoreBoard.addGame({
        homeTeam: 'Spain',
        awayTeam: 'Brazil',
        gameId,
      });
      scoreBoard.startGame(gameId);

      expect(scoreBoard.getGameStatus(gameId)).toBe(GameStatus.STARTED);
    });

    it('should get status game finished', () => {
      const gameId = 12;
      scoreBoard.addGame({
        homeTeam: 'Spain',
        awayTeam: 'Brazil',
        gameId,
      });
      expect(scoreBoard.getGameStatus(gameId)).toBe(GameStatus.NOT_STARTED);
      scoreBoard.startGame(gameId);
      expect(scoreBoard.getGameStatus(gameId)).toBe(GameStatus.STARTED);
      scoreBoard.finishedGame(gameId);
      expect(scoreBoard.getGameStatus(gameId)).toBe(GameStatus.FINISHED);
    });

    it('should throw an error if game id not matching', () => {
      const gameId = 33;
      const wrongGameID = 44;
      scoreBoard.addGame({
        homeTeam: 'Spain',
        awayTeam: 'Brazil',
        gameId,
      });
      expect(scoreBoard.getGameStatus(gameId)).toBe(GameStatus.NOT_STARTED);
      scoreBoard.startGame(gameId);
      expect(scoreBoard.getGameStatus(gameId)).toBe(GameStatus.STARTED);
      scoreBoard.finishedGame(gameId);

      expect(() => scoreBoard.finishedGame(wrongGameID)).toThrow(
        error.INVALID_GAME_ID
      );
    });
  });

  describe('update game score', () => {
    it('should update the game score', () => {
      const gameId = 11;
      scoreBoard.addGame({
        homeTeam: 'Spain',
        awayTeam: 'Brazil',
        gameId,
      });
      scoreBoard.startGame(gameId);

      expect(scoreBoard.getGameStatus(gameId)).toBe(GameStatus.STARTED);

      scoreBoard.updateScore({
        gameId: gameId,
        homeTeamScore: 2,
        awayTeamScore: 1,
      });
    });

    it('should throw error while update score if game is finished', () => {
      const gameId = 13;
      scoreBoard.addGame({
        homeTeam: 'Spain',
        awayTeam: 'Brazil',
        gameId,
      });
      expect(scoreBoard.getGameStatus(gameId)).toBe(GameStatus.NOT_STARTED);
      scoreBoard.startGame(gameId);
      expect(scoreBoard.getGameStatus(gameId)).toBe(GameStatus.STARTED);

      scoreBoard.updateScore({
        gameId: gameId,
        homeTeamScore: 2,
        awayTeamScore: 1,
      });
      scoreBoard.finishedGame(gameId);
      expect(scoreBoard.getGameStatus(gameId)).toBe(GameStatus.FINISHED);

      expect(() =>
        scoreBoard.updateScore({
          gameId,
          homeTeamScore: 1,
          awayTeamScore: 2,
        })
      ).toThrow(error.UNABLE_TO_UPDATE_SCORE);
    });

    it('should throw an error if game id not matching while score updating', () => {
      const gameId = 8;
      const wrongGameID = 9;
      scoreBoard.addGame({
        homeTeam: 'Spain',
        awayTeam: 'Brazil',
        gameId,
      });
      expect(scoreBoard.getGameStatus(gameId)).toBe(GameStatus.NOT_STARTED);
      scoreBoard.startGame(gameId);
      expect(scoreBoard.getGameStatus(gameId)).toBe(GameStatus.STARTED);

      expect(() =>
        scoreBoard.updateScore({
          gameId: wrongGameID,
          homeTeamScore: 1,
          awayTeamScore: 2,
        })
      ).toThrow(error.INVALID_GAME_ID);
    });

    it('should throw an error if score data negative while score updating', () => {
      const gameId = 8;
      const negativeHomeTeamScore = -2;
      const negativeAwayTeamScore = -1;
      scoreBoard.addGame({
        homeTeam: 'Spain',
        awayTeam: 'Brazil',
        gameId,
      });
      expect(scoreBoard.getGameStatus(gameId)).toBe(GameStatus.NOT_STARTED);
      scoreBoard.startGame(gameId);
      expect(scoreBoard.getGameStatus(gameId)).toBe(GameStatus.STARTED);

      expect(() =>
        scoreBoard.updateScore({
          gameId,
          homeTeamScore: negativeHomeTeamScore,
          awayTeamScore: 2,
        })
      ).toThrow(error.INVALID_ENTER_SCORE);

      expect(() =>
        scoreBoard.updateScore({
          gameId,
          homeTeamScore: 2,
          awayTeamScore: negativeAwayTeamScore,
        })
      ).toThrow(error.INVALID_ENTER_SCORE);
    });
  });
});
