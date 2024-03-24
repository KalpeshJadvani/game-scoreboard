import { Team } from '../model/Team';
import { error } from '../utils/errorDefinition';
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
});
