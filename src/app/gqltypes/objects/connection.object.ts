import { ObjectType, Field } from 'type-graphql';

import { Fixture } from '@/domain/models/fixtures.model';
import { PageInfo } from './pagination.object';

@ObjectType()
export class FixtureConnection {
  @Field((type) => [Fixture])
  nodes: Fixture[];

  @Field()
  pageInfo: PageInfo;
}
