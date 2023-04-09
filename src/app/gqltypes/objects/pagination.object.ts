import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class PageInfo {
  @Field({ nullable: true })
  hasNextPage: boolean;

  @Field((type) => String, { nullable: true })
  nextToken: string | null;
}
