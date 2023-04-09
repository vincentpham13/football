import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { join, resolve } from 'path';

import * as entities from './entities';
import config from '../../config';

export const AppDataSource = new DataSource({
  type: 'mysql',
  name: 'FootBallApp',
  connectorPackage: 'mysql2',
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_DATABASE,
  synchronize: false,
  logging: false,
  extra: {
    connectionLimit: 20,
  },
  poolSize: 20,
  entities: [resolve(__dirname, 'entities/**/*.entity{.ts,.js}')],
  multipleStatements: true,
  charset: 'utf8mb4',
  subscribers: [],
  migrations: [resolve(__dirname, 'migrations/**/*.ts')],
});
