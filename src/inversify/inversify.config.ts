import 'reflect-metadata';
import { Container } from 'inversify';
import { DataSource } from 'typeorm';

import { TournamentLoader, TeamLoader, IDataLoader } from '@/app/loaders';
import { CalendarResolver, FixtureResolver } from '@/app/resolvers/fixtures';
import {
  FixturesRepository,
  TournamentRepository,
  TeamRepository,
} from '@/domain/repositories';
import {
  FixtureService,
  TournamentService,
  TeamService,
} from '@/domain/services';
import {
  FixturesRepositoryImpl,
  TournamentRepositoryImpl,
  TeamRepositoryImpl,
} from '@/infras/persistence/typeorm/repositories';
import { AppDataSource } from '@/infras/persistence/typeorm/data-source';
import { TYPES } from '@/constants/di/inversify';
import { Team, Tournament } from '@/domain/models';

// Fixture Binding
const container = new Container();

// Database binding
container.bind<DataSource>(TYPES.AppDataSource).toConstantValue(AppDataSource);

container
  .bind<FixturesRepository>(TYPES.FixtureRepository)
  .to(FixturesRepositoryImpl);
container.bind<FixtureService>(TYPES.FixtureService).to(FixtureService);
container.bind<FixtureResolver>(FixtureResolver).toSelf().inTransientScope();
container.bind<CalendarResolver>(CalendarResolver).toSelf();

// Tournajment Binding
container
  .bind<TournamentRepository>(TYPES.TournamentRepository)
  .to(TournamentRepositoryImpl);
container
  .bind<TournamentService>(TYPES.TournamentService)
  .to(TournamentService);

// Team Binding
container.bind<TeamRepository>(TYPES.TeamRepository).to(TeamRepositoryImpl);
container.bind<TeamService>(TYPES.TeamService).to(TeamService);

// Dataloader Binding
container
  .bind<IDataLoader<Tournament>>(TYPES.TournamentLoader)
  .to(TournamentLoader)
  .inSingletonScope();
container
  .bind<IDataLoader<Team>>(TYPES.TeamLoader)
  .to(TeamLoader)
  .inSingletonScope();

export { container };
