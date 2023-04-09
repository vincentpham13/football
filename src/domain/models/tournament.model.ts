import { AutoMap } from '@automapper/classes';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Tournament {
  @Field((type) => ID)
  @AutoMap()
  id: string;

  @Field()
  @AutoMap()
  name: string;
}
