import { inject, injectable } from 'inversify';
import { DataSource, In } from 'typeorm';
import { TeamRepository } from '@/domain/repositories';
import { Team } from '@/domain/models';

import { TeamEntity } from '../entities';
import mapper from '../mappers';
import { TYPES } from '@/constants/di/inversify';

@injectable()
export class TeamRepositoryImpl implements TeamRepository {
  constructor(
    @inject(TYPES.AppDataSource) private readonly appDataSource: DataSource,
  ) {}

  async find(): Promise<Team[]> {
    const teamRepo = await this.appDataSource.getRepository(TeamEntity);

    const teams = await teamRepo.find();

    const results = teams.map((team) => mapper.map(team, TeamEntity, Team));

    return results;
  }

  async findByIds(ids: string[]): Promise<Team[]> {
    const teamRepo = await this.appDataSource.getRepository(TeamEntity);

    const teams = await teamRepo.find({
      where: {
        id: In(ids),
      },
    });

    const results = teams.map((team) => mapper.map(team, TeamEntity, Team));

    return results;
  }
}
