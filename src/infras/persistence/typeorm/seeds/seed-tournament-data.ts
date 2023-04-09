import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { TournamentEntity } from '../entities';

export default class CreateTournaments implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(TournamentEntity)
      .values([
        {
          id: '123e4567-e89b-12d3-a456-426655440000',
          name: 'Premier League',
          startDate: '2022-08-13 00:00:00',
          endDate: '2023-05-21 00:00:00',
        },
        {
          id: '223e4567-e89b-12d3-a456-426655440000',
          name: 'Champions League',
          startDate: '2022-09-13 00:00:00',
          endDate: '2023-05-27 00:00:00',
        },
        {
          id: '323e4567-e89b-12d3-a456-426655440000',
          name: 'FA Cup',
          startDate: '2022-12-04 00:00:00',
          endDate: '2023-05-27 00:00:00',
        },
        {
          id: '423e4567-e89b-12d3-a456-426655440000',
          name: 'Europa League',
          startDate: '2022-09-15 00:00:00',
          endDate: '2023-05-24 00:00:00',
        },
        {
          id: '523e4567-e89b-12d3-a456-426655440000',
          name: 'World Cup',
          startDate: '2022-11-21 00:00:00',
          endDate: '2022-12-18 00:00:00',
        },
        {
          id: '623e4567-e89b-12d3-a456-426655440000',
          name: 'Copa America',
          startDate: '2023-06-01 00:00:00',
          endDate: '2023-06-30 00:00:00',
        },
        {
          id: '723e4567-e89b-12d3-a456-426655440000',
          name: 'Euro Cup',
          startDate: '2024-06-01 00:00:00',
          endDate: '2024-06-30 00:00:00',
        },
        {
          id: '823e4567-e89b-12d3-a456-426655440000',
          name: 'African Cup of Nations',
          startDate: '2023-01-09 00:00:00',
          endDate: '2023-02-06 00:00:00',
        },
        {
          id: '923e4567-e89b-12d3-a456-426655440000',
          name: 'Asian Cup',
          startDate: '2023-06-01 00:00:00',
          endDate: '2023-06-30 00:00:00',
        },
        {
          id: 'a23e4567-e89b-12d3-a456-426655440000',
          name: 'Olympic Games',
          startDate: '2024-07-26 00:00:00',
          endDate: '2024-08-11 00:00:00',
        },
      ])
      .execute();
  }
}
