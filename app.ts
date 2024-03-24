import { ScoreBoard } from './src';
console.log('Start App');
const board = new ScoreBoard();

board.addGame({ gameId: 0, homeTeam: 'Mexico', awayTeam: 'Canada' });

board.startGame(0);

// clint can update the score
board.updateScore({ gameId: 0, homeTeamScore: 1, awayTeamScore: 0 });

board.finishedGame(0);
