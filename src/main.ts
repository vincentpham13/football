import 'reflect-metadata';

require('dotenv').config();

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { container } from '@/inversify/inversify.config';

import config from '@/infras/config';
import { AppDataSource } from '@/infras/persistence/typeorm/data-source';

import { TContext, buildSchemaPromise } from './app';

(async function () {
  try {
    await AppDataSource.initialize();
    console.info('Data Source has been initialized!');

    const builtSchema = await buildSchemaPromise;
    const server = new ApolloServer({
      schema: builtSchema,
      plugins: [
        {
          requestDidStart: async () => ({
            async willSendResponse(requestContext) {
              const context = requestContext.contextValue as TContext;
            },
          }),
        },
      ],
    });

    const { url } = await startStandaloneServer(server, {
      context: async () => {
        const requestId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER); // uuid-like

        const context = { requestId, container }; // create our context
        // container.set("context", context); // place context or other data in container
        return context;
      },
      listen: { port: config.PORT },
    });
    console.log(`🚀  Server ready at ${url}`);
  } catch (error) {
    console.error('Error during initialization', error);
  }
})();
