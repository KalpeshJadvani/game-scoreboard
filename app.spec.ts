import { ScoreBoard } from './src';

describe('app', () => {
  let board: ScoreBoard;

  beforeEach(() => {
    board = new ScoreBoard();
  });

  it('should add game', () => {
    board.addGame({ gameId: 0, homeTeam: 'Mexico', awayTeam: 'Canada' });
  });
});
