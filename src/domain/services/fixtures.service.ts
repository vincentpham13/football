import 'reflect-metadata';
import { inject, injectable } from 'inversify';

import { di } from '@/constants';
import { MatchesDate } from '@/app/gqltypes/objects';

import { FixturesRepository } from '../repositories/fixtures.repository';
import { Fixture } from '../models';

@injectable()
export class FixtureService {
  constructor(
    @inject(di.TYPES.FixtureRepository)
    private fixtureRepository: FixturesRepository,
  ) {}

  async getFixtures(
    limitQuery: number,
    pageIndex: number,
    queryMatchDay?: string,
  ): Promise<Fixture[]> {
    const fixtures = await this.fixtureRepository.findPagination(
      limitQuery,
      pageIndex,
      queryMatchDay,
    );

    return fixtures;
  }

  async getCalendar(): Promise<MatchesDate[]> {
    const results = await this.fixtureRepository.findMatchDate();

    return results;
  }
}
