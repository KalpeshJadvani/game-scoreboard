import { Team } from './Team';

describe('Team', () => {
  describe('constructor', () => {
    it('should create a Team instance with provided name', () => {
      const team = new Team({ name: 'Germany' });
      expect(team.getName()).toBe('Germany');
    });
  });
});
