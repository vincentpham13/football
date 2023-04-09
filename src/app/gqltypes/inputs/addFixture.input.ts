import { Field, InputType } from 'type-graphql';

@InputType()
export class AddFixtureInput {
  @Field()
  id: string;

  @Field()
  name: string;
}
