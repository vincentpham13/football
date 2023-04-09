import { inject, injectable } from 'inversify';
import { DataSource } from 'typeorm';
import moment from 'moment';

import { Fixture } from '@/domain/models/fixtures.model';
import { FixturesRepository } from '@/domain/repositories/fixtures.repository';
import { MatchesDate } from '@/domain/models';
import { TYPES } from '@/constants/di/inversify';

import mapper from '../mappers';
import { FixtureEntity } from '../entities';

@injectable()
export class FixturesRepositoryImpl implements FixturesRepository {
  constructor(
    @inject(TYPES.AppDataSource) private readonly appDataSource: DataSource,
  ) {}

  async find(): Promise<Fixture[]> {
    const fixturesRepo = await this.appDataSource.getRepository(FixtureEntity);

    const fixtures = await fixturesRepo.find();

    const results = fixtures.map((fixture) =>
      mapper.map(fixture, FixtureEntity, Fixture),
    );

    return results;
  }

  findByIds(_ids: string[]): Promise<Fixture[]> {
    throw new Error('Method not implemented.');
  }

  async findPagination(
    limitQuery: number,
    pageIndex: number,
    queryMatchDay?: string,
  ): Promise<Fixture[]> {
    const qb = await this.appDataSource
      .createQueryBuilder()
      .from(FixtureEntity, 'fixtures');

    if (queryMatchDay) {
      const matchDateQuery = moment.utc(queryMatchDay).format('YYYY-MM-DD');
      qb.where(`date(matchDateTime) = '${matchDateQuery}'`);
    }

    qb.select('*')
      .orderBy('matchDateTime', 'ASC')
      .skip(pageIndex * limitQuery)
      .take(limitQuery + 1);

    const fixtures = await qb.getRawMany<FixtureEntity>();

    const results = fixtures.map((fixture) =>
      mapper.map(fixture, FixtureEntity, Fixture),
    );

    return results;
  }

  async findMatchDate(): Promise<MatchesDate[]> {
    const results = await this.appDataSource
      .createQueryBuilder()
      .select(`date(matchDateTime) as matchesDate`)
      .from(FixtureEntity, 'fixtures')
      .groupBy(`matchesDate`)
      .getRawMany<MatchesDate>();

    return results;
  }
}
