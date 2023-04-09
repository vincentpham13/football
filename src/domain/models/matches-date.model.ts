import { AutoMap } from '@automapper/classes';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class MatchesDate {
  @Field()
  @AutoMap()
  matchesDate: string;
}
