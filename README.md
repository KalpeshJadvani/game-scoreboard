# Live Football World Cup Score Board Library

## Application features:

The board supports the following operations:

1. Start a new match, assuming initial score 0 – 0 and adding it the scoreboard:
   This should capture following parameters:
   a. Home team
   b. Away team

   e.g board.addGame({ gameId: 0, homeTeam: 'Mexico', awayTeam: 'Canada' });
   e.g board.startGame(0);

2. Update score. This should receive a pair of absolute scores: home team score and away team  
   score.

   e.g board.updateScore({ gameId: 0, homeTeamScore: 0, awayTeamScore: 5 });

3. Finish match currently in progress. This removes a match from the scoreboard.

   e.g board.finishedGame(3);

4. Get a summary of matches in progress ordered by their total score. The matches with the same total score will be returned ordered by the most recently started match in the scoreboard.

   e.g board.getSummary()

✍️ For example, if following matches are started in the specified order and their scores respectively updated:

    a. Mexico 0 - Canada 5
    b. Spain 10 - Brazil 2
    c. Germany 2 - France 2
    d. Uruguay 6 - Italy 6
    e. Argentina 3 - Australia 1

The summary should be as follows:

    1. Uruguay 6 - Italy 6
    2. Spain 10 - Brazil 2
    3. Mexico 0 - Canada 5
    4. Argentina 3 - Australia 1
    5. Germany 2 - France 2

### Possible Improvements Area

- Summary, we may enhance or improve according business requirement.
- we cold expose finished match details to other use e.g kind of overall report.
- Team model has name property but we could add the details accordingly.

### Running The App locally

To run the app, follow these steps.

To install dependencies:
npm install

To run the app:
npm run start:dev

To run the tests:
npm run test
