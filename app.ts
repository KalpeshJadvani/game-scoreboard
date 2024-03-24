import { ScoreBoard } from './src';
console.log('Start App');
const board = new ScoreBoard();

board.addGame({ gameId: 0, homeTeam: 'Mexico', awayTeam: 'Canada' });

board.startGame(0);

board.finishedGame(0);
