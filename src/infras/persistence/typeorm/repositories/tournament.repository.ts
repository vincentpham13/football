import { inject, injectable } from 'inversify';

import { DataSource, In } from 'typeorm';
import { TournamentRepository } from '@/domain/repositories';
import { Tournament } from '@/domain/models';

import { TournamentEntity } from '../entities';
import mapper from '../mappers';
import { TYPES } from '@/constants/di/inversify';

@injectable()
export class TournamentRepositoryImpl implements TournamentRepository {
  constructor(
    @inject(TYPES.AppDataSource) private readonly appDataSource: DataSource,
  ) {}

  async find(): Promise<Tournament[]> {
    const tournamentRepo = await this.appDataSource.getRepository(
      TournamentEntity,
    );

    const tournaments = await tournamentRepo.find();

    const results = tournaments.map((tournament) =>
      mapper.map(tournament, TournamentEntity, Tournament),
    );

    return results;
  }

  async findByIds(ids: string[]): Promise<Tournament[]> {
    const tournamentRepo = await this.appDataSource.getRepository(
      TournamentEntity,
    );

    const tournaments = await tournamentRepo.find({
      where: {
        id: In(ids),
      },
    });

    const results = tournaments.map((tournament) =>
      mapper.map(tournament, TournamentEntity, Tournament),
    );

    return results;
  }
}
