import { inject, injectable } from 'inversify';
import { Arg, Ctx, Query, Resolver, FieldResolver, Root } from 'type-graphql';

import { FixtureConnection } from '@/app/gqltypes/objects';
import { FixtureService } from '@/domain/services';
import { di } from '@/constants';
import { Fixture, Team, Tournament } from '@/domain/models';
import { IDataLoader } from '@/app/loaders';
import { TContext } from '@/app';

@injectable()
@Resolver((of) => Fixture)
export class FixtureResolver {
  constructor(
    @inject(di.TYPES.FixtureService)
    private readonly fixtureService: FixtureService,
    @inject(di.TYPES.TournamentLoader)
    private readonly tournamentLoader: IDataLoader<Tournament>,
    @inject(di.TYPES.TeamLoader) private readonly teamLoader: IDataLoader<Team>,
  ) {}

  @Query((returns) => FixtureConnection)
  async fixtures(
    @Arg('query', { nullable: true }) query?: string,
    @Arg('first', { nullable: true }) first?: number,
    @Arg('after', { nullable: true }) after?: string,
    @Ctx() ctx?: TContext,
  ): Promise<FixtureConnection> {
    const DEFAULT_PAGE = 30;

    let limitQuery = first || DEFAULT_PAGE;
    let pageIndex = 0;
    let queryMatchDay = query;
    if (after) {
      const afterObj = JSON.parse(Buffer.from(after, 'base64').toString());

      const { query: lastQuery, perPage, offset } = afterObj;

      queryMatchDay = lastQuery;
      limitQuery = perPage;
      pageIndex = offset;
    }

    const results = await this.fixtureService.getFixtures(
      limitQuery,
      pageIndex,
      queryMatchDay,
    );

    return {
      nodes: results.slice(0, limitQuery),
      pageInfo: {
        hasNextPage: results.length > limitQuery,
        nextToken:
          results.length > limitQuery
            ? `${Buffer.from(
                JSON.stringify({
                  query,
                  perPage: limitQuery,
                  offset: pageIndex + 1,
                }),
              ).toString('base64')}`
            : null,
      },
    };
  }

  @FieldResolver((returns) => Tournament)
  tournament(@Root() root: Fixture, @Ctx() ctx?: TContext) {
    return this.tournamentLoader.loadById(root.tournamentId);
  }

  @FieldResolver((returns) => Team)
  homeTeam(@Root() root: Fixture, @Ctx() ctx?: TContext) {
    return this.teamLoader.loadById(root.homeTeamId);
  }

  @FieldResolver((returns) => Team)
  awayTeam(@Root() root: Fixture, @Ctx() ctx?: TContext) {
    return this.teamLoader.loadById(root.awayTeamId);
  }
}
