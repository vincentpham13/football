import { injectable, inject } from 'inversify';
import DataLoader from 'dataloader';
import { Team, Tournament } from '@/domain/models';
import { di } from '@/constants';
import { TeamService, TournamentService } from '@/domain/services';

export interface IDataLoader<T> {
  loadById(id: string): Promise<T>;
}

@injectable()
export class TournamentLoader implements IDataLoader<Tournament> {
  private readonly dataLoader: DataLoader<string, Tournament>;

  constructor(
    @inject(di.TYPES.TournamentService)
    private readonly tournamentService: TournamentService,
  ) {
    this.dataLoader = new DataLoader<string, Tournament>(
      this.batchLoadUsers.bind(this),
      { cache: true },
    );
  }

  private async batchLoadUsers(
    ids: ReadonlyArray<string>,
  ): Promise<Tournament[]> {
    const tournaments = await this.tournamentService.getTournamentsByIds([
      ...ids,
    ]);

    // TODO: replace with normalizr
    const tournamentMap = tournaments.reduce<{
      [key: string]: Tournament;
    }>((pre, current) => {
      return {
        ...pre,
        [current.id]: current,
      };
    }, {});

    return ids.map((id) => {
      const tournament = tournamentMap[id];

      return tournament;
    });
  }

  loadById(id: string): Promise<Tournament> {
    return this.dataLoader.load(id);
  }
}

@injectable()
export class TeamLoader implements IDataLoader<Team> {
  private dataLoader: DataLoader<string, Team>;

  constructor(
    @inject(di.TYPES.TeamService) private readonly teamService: TeamService,
  ) {
    this.dataLoader = new DataLoader<string, Team>(
      this.batchLoadUsers.bind(this),
      { cache: true },
    );
  }

  private async batchLoadUsers(ids: ReadonlyArray<string>): Promise<Team[]> {
    const teams = await this.teamService.getTeamsByIds([...ids]);

    // TODO: replace with normalizr
    const teamMap = teams.reduce<{
      [key: string]: Tournament;
    }>((pre, current) => {
      return {
        ...pre,
        [current.id]: current,
      };
    }, {});

    return ids.map((id) => {
      const team = teamMap[id];

      return team;
    });
  }

  loadById(id: string): Promise<Team> {
    return this.dataLoader.load(id);
  }
}
