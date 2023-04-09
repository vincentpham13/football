import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class MatchesDate {
  @Field()
  matchesDate: string;
}
