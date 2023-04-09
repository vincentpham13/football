import { inject, injectable } from 'inversify';

import { di } from '@/constants';

import { TeamRepository } from '../repositories';

@injectable()
export class TeamService {
  constructor(
    @inject(di.TYPES.TeamRepository) private teamRepository: TeamRepository,
  ) {}

  async getTeamsByIds(ids: string[]) {
    const teams = await this.teamRepository.findByIds(ids);

    return teams;
  }
}
