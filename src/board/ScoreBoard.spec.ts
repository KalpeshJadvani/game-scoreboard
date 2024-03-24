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

  describe('get game summary ', () => {
    it('should get game summary successfully', () => {
      const gameId1 = 11;
      const gameId2 = 12;
      const gameId3 = 13;
      const gameId4 = 14;
      const gameId5 = 15;
      scoreBoard.addGame({
        homeTeam: 'Mexico',
        awayTeam: 'Canada',
        gameId: gameId1,
      });
      scoreBoard.addGame({
        homeTeam: 'Spain',
        awayTeam: 'Brazil',
        gameId: gameId2,
      });
      scoreBoard.addGame({
        homeTeam: 'Germany',
        awayTeam: 'France',
        gameId: gameId3,
      });
      scoreBoard.addGame({
        homeTeam: 'Uruguay',
        awayTeam: 'Italy',
        gameId: gameId4,
      });
      scoreBoard.addGame({
        homeTeam: 'Argentina',
        awayTeam: 'Australia',
        gameId: gameId5,
      });
      scoreBoard.startGame(gameId1);
      scoreBoard.startGame(gameId2);
      scoreBoard.startGame(gameId3);
      scoreBoard.startGame(gameId4);
      scoreBoard.startGame(gameId5);

      scoreBoard.updateScore({
        gameId: gameId1,
        homeTeamScore: 0,
        awayTeamScore: 5,
      });

      scoreBoard.updateScore({
        gameId: gameId2,
        homeTeamScore: 10,
        awayTeamScore: 2,
      });

      scoreBoard.updateScore({
        gameId: gameId3,
        homeTeamScore: 2,
        awayTeamScore: 2,
      });

      scoreBoard.updateScore({
        gameId: gameId4,
        homeTeamScore: 6,
        awayTeamScore: 6,
      });

      scoreBoard.updateScore({
        gameId: gameId5,
        homeTeamScore: 3,
        awayTeamScore: 1,
      });
      const summary = scoreBoard.getSummary();
      expect(summary.length).toBe(5);
      // we are cheeking  in summery that it should be below value
      // 1. Uruguay 6 - Italy 6
      const game1 = summary[0];
      expect(game1.totalScore).toBe(12);
      expect(game1.homeTeam).toBe('Uruguay');
      expect(game1.awayTeam).toBe('Italy');
      expect(game1.homeTeamScore).toBe(6);
      expect(game1.awayTeamScore).toBe(6);

      // we are cheeking in summery that it should be below value
      // 4. Argentina 3 - Australia 1
      const game4 = summary[3];
      expect(game4.totalScore).toBe(4);
      expect(game4.homeTeam).toBe('Argentina');
      expect(game4.awayTeam).toBe('Australia');
      expect(game4.homeTeamScore).toBe(3);
      expect(game4.awayTeamScore).toBe(1);
    });

    it('should get game empty array of summary', () => {
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

      expect(scoreBoard.getSummary()).toMatchInlineSnapshot(`[]`);
    });
  });
});
