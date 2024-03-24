export interface ScoreBoard {
  addGame(game: AddGameType): void;
}

export type TeamType = {
  name: string;
};

export type AddGameType = {
  homeTeam: string;
  awayTeam: string;
  gameId: number;
};
