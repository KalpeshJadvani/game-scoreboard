import { ScoreBoard } from './src';
const board = new ScoreBoard();

board.addGame({ gameId: 0, homeTeam: 'Mexico', awayTeam: 'Canada' });
board.addGame({ gameId: 1, homeTeam: 'Spain', awayTeam: 'Brazil' });
board.addGame({ gameId: 2, homeTeam: 'Germany', awayTeam: 'France' });
board.addGame({ gameId: 3, homeTeam: 'Uruguay', awayTeam: 'Italy' });
board.addGame({ gameId: 4, homeTeam: 'Argentina', awayTeam: 'Australia' });

board.startGame(0);
board.startGame(1);
board.startGame(2);
board.startGame(3);
board.startGame(4);

// a. Mexico 0 - Canada 5
// b. Spain 10 - Brazil 2
// c. Germany 2 - France 2
// d. Uruguay 6 - Italy 6
// e.Argentina 3 - Australia 1

// According above updated score & data

// Clint can update the score
board.updateScore({ gameId: 0, homeTeamScore: 0, awayTeamScore: 5 });
board.updateScore({ gameId: 1, homeTeamScore: 10, awayTeamScore: 2 });
board.updateScore({ gameId: 2, homeTeamScore: 2, awayTeamScore: 2 });
board.updateScore({ gameId: 3, homeTeamScore: 6, awayTeamScore: 6 });
board.updateScore({ gameId: 4, homeTeamScore: 3, awayTeamScore: 1 });

const summary = board.getSummary();
// printing summary
summary.map((game, index) => {
  console.log(
    `${index + 1}.  ${game.homeTeam} : ${game.homeTeamScore}    ${
      game.awayTeam
    } : ${game.awayTeamScore}`
  );
});

board.finishedGame(0);
