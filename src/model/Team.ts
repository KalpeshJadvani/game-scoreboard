import { TeamType } from '../utils/types';

export class Team {
  protected name: string;

  constructor({ name }: TeamType) {
    this.name = name;
  }
  getName(): string {
    return this.name;
  }
}
