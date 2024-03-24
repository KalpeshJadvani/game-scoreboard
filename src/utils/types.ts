export interface ScoreBoard {
  addGame(game: AddGameType): void;
  updateScore(score: UpdateScoreType): void;
  getSummary(): SummaryType;
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

export type UpdateScoreType = {
  homeTeamScore: number;
  awayTeamScore: number;
  gameId: number;
};

export type AddGameScoreType = Pick<
  UpdateScoreType,
  'homeTeamScore' | 'awayTeamScore'
>;

export type SummaryType = {
  homeTeam: string;
  awayTeam: string;
  homeTeamScore: number;
  awayTeamScore: number;
  totalScore: number;
  gameId: number;
  gameStatus: GameStatus;
  startTime: Date;
}[];
