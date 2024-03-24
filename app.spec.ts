import { ScoreBoard } from './src';
import { GameStatus } from './src/utils/types';

describe('app', () => {
  let board: ScoreBoard;

  beforeEach(() => {
    board = new ScoreBoard();
  });

  it('should add game successfully and not start yet', () => {
    board.addGame({ gameId: 0, homeTeam: 'Mexico', awayTeam: 'Canada' });
    expect(board.getGameStatus(0)).toBe(GameStatus.NOT_STARTED);
  });

  it('should add games and start them', () => {
    board.addGame({ gameId: 0, homeTeam: 'Mexico', awayTeam: 'Canada' });
    board.addGame({ gameId: 1, homeTeam: 'Spain', awayTeam: 'Brazil' });

    board.startGame(0);
    board.startGame(1);

    expect(board.getGameStatus(0)).toBe(GameStatus.STARTED);
    expect(board.getGameStatus(1)).toBe(GameStatus.STARTED);
  });

  it('should finish games with right game id', () => {
    board.addGame({ gameId: 0, homeTeam: 'Mexico', awayTeam: 'Canada' });
    board.addGame({ gameId: 1, homeTeam: 'Spain', awayTeam: 'Brazil' });

    board.startGame(0);
    board.startGame(1);
    expect(board.getGameStatus(0)).toBe(GameStatus.STARTED);
    expect(board.getGameStatus(1)).toBe(GameStatus.STARTED);
    board.finishedGame(0);
    board.finishedGame(1);
    expect(board.getGameStatus(0)).toBe(GameStatus.FINISHED);
    expect(board.getGameStatus(1)).toBe(GameStatus.FINISHED);
  });

  it('should update the score of game with right game id', () => {
    board.addGame({ gameId: 0, homeTeam: 'Mexico', awayTeam: 'Canada' });
    board.addGame({ gameId: 1, homeTeam: 'Spain', awayTeam: 'Brazil' });

    board.startGame(0);
    board.startGame(1);
    expect(board.getGameStatus(0)).toBe(GameStatus.STARTED);
    expect(board.getGameStatus(1)).toBe(GameStatus.STARTED);

    board.updateScore({ gameId: 1, homeTeamScore: 2, awayTeamScore: 1 });
    board.updateScore({ gameId: 0, homeTeamScore: 0, awayTeamScore: 1 });
  });

  it('should get summery of games', () => {
    board.addGame({ gameId: 0, homeTeam: 'Mexico', awayTeam: 'Canada' });
    board.addGame({ gameId: 1, homeTeam: 'Spain', awayTeam: 'Brazil' });

    board.startGame(0);
    board.startGame(1);
    expect(board.getGameStatus(0)).toBe(GameStatus.STARTED);
    expect(board.getGameStatus(1)).toBe(GameStatus.STARTED);

    board.updateScore({ gameId: 1, homeTeamScore: 2, awayTeamScore: 1 });
    board.updateScore({ gameId: 0, homeTeamScore: 0, awayTeamScore: 1 });
    const summary = board.getSummary();
    expect(summary.length).toBe(2);

    // checking with first element
    expect(summary[0].totalScore).toBe(3);
    expect(summary[0].awayTeam).toBe('Brazil');

    // checking with second element
    expect(summary[1].awayTeamScore).toBe(1);
    expect(summary[1].homeTeamScore).toBe(0);
    expect(summary[1].homeTeam).toBe('Mexico');
  });
});
