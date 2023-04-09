import { Fixture, MatchesDate } from '../models';
import { BaseRepository } from './base.repository';

export interface FixturesRepository extends BaseRepository<Fixture> {
  findPagination(
    limitQuery: number,
    pageIndex: number,
    queryMatchDay?: string,
  ): Promise<Fixture[]>;
  findMatchDate(): Promise<MatchesDate[]>;
}
