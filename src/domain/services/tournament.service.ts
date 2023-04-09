import 'reflect-metadata';

import { inject, injectable } from 'inversify';

import { di } from '@/constants';

import { TournamentRepository } from '../repositories';

@injectable()
export class TournamentService {
  constructor(
    @inject(di.TYPES.TournamentRepository)
    private tournamentRepository: TournamentRepository,
  ) {}

  async getTournamentsByIds(ids: string[]) {
    const tournaments = await this.tournamentRepository.findByIds(ids);

    return tournaments;
  }
}
