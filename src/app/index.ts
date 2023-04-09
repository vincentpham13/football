import { Container } from 'inversify';
import { DataSource } from 'typeorm';
import { buildSchema, ResolverData } from 'type-graphql';

import { CalendarResolver, FixtureResolver } from './resolvers/fixtures';

export type TContext = {
  dataSource: DataSource;
  container: Container;
  requestId: string;
};

export const buildSchemaPromise = buildSchema({
  resolvers: [FixtureResolver, CalendarResolver],
  container: ({ context }: ResolverData<TContext>) => {
    return context.container;
  },
});
