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

export enum GameStatus {
  NOT_STARTED = 'NOT_STARTED',
  STARTED = 'STARTED',
  FINISHED = 'FINISHED',
}
