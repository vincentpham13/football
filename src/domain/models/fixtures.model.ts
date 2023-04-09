import { AutoMap } from '@automapper/classes';
import { Field, ID, ObjectType } from 'type-graphql';

import { Team } from './team.model';
import { Tournament } from './tournament.model';

@ObjectType() // TypeGraphql
export class Fixture {
  @Field((type) => ID) // TypeGraphql
  @AutoMap() // AutoMapper
  id: string;

  @AutoMap()
  @Field()
  homeTeamId: string;

  @Field({ nullable: true })
  homeTeam: Team;

  @AutoMap()
  @Field()
  awayTeamId: string;

  @Field({ nullable: true })
  awayTeam: Team;

  @Field()
  @AutoMap()
  matchDateTime: string;

  @AutoMap()
  @Field({ nullable: true })
  homeTeamScore: number;

  @AutoMap()
  @Field({ nullable: true })
  awayTeamScore: number;

  @AutoMap()
  @Field()
  tournamentId: string;

  @AutoMap()
  @Field()
  location: string;

  @AutoMap()
  @Field()
  live: boolean;

  @Field({ nullable: true })
  tournament: Tournament;
}
