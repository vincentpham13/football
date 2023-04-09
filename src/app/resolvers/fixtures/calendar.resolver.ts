import { inject, injectable } from 'inversify';
import { Query, Resolver } from 'type-graphql';

import { MatchesDate } from '@/app/gqltypes/objects';
import { FixtureService } from '@/domain/services';
import { di } from '@/constants';
import { Fixture } from '@/domain/models';

@injectable()
@Resolver((of) => Fixture)
export class CalendarResolver {
  constructor(
    @inject(di.TYPES.FixtureService)
    private readonly fixtureService: FixtureService,
  ) {}

  @Query((returns) => [MatchesDate])
  async calendar(): Promise<MatchesDate[]> {
    return this.fixtureService.getCalendar();
  }
}
