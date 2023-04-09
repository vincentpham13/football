import { Factory, Seeder } from 'typeorm-seeding';
import { Connection, InsertResult } from 'typeorm';

import { TeamEntity } from '../entities';

export default class CreateTeams implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(TeamEntity)
      .values([
        { id: '15c18924-0234-4ba8-a60c-b2a3c981f750', name: 'Wolves' },
        { id: '1ad91e7a-db31-4558-a1b0-99a242cee9f1', name: 'Aston Villa' },
        { id: '2cb22a77-fe3d-47a7-9c68-eefc16e40a1b', name: 'Burnley' },
        { id: '3f37bc9d-1cd2-4bd4-89c0-fcb316843d0d', name: 'Leeds' },
        { id: '4b28f260-3be5-473b-80cf-dd3e937b770b', name: 'Spurs' },
        { id: '59b1a0ed-1aaf-4015-a530-e363e7b7e056', name: 'Man Utd' },
        { id: '6b6c7349-cbb4-45db-859b-9c7980c32c40', name: 'Southampton' },
        { id: '6e8ae6cf-5f69-43c0-9aab-5eb8b65fea15', name: 'Chelsea' },
        { id: '72709ab4-ba0a-429a-b9c5-9be3a38ba186', name: 'Brentford' },
        { id: '78995def-7fe5-4c8b-978b-8568a4f66adc', name: 'Norwich' },
        { id: '80176c4a-9937-454d-929c-5ebd14cb4f91', name: 'Brighton' },
        { id: '9cfcdad1-7e49-4934-93ec-559c07c2f20f', name: 'Man City' },
        { id: 'a1742b2d-6f40-4954-8a4b-8cc87bbcc10d', name: 'West Ham' },
        { id: 'c89d60fc-b96a-4d34-a136-ccccb466292a', name: 'Arsenal' },
        { id: 'c9e8aa02-a9f3-4424-9862-80eb7313af11', name: 'Leicester' },
        { id: 'cc9b7af5-a2dd-48ff-aae3-1d2798fab068', name: 'Newcastle' },
        { id: 'dd586be3-8f65-4988-a2dc-630fd203ab6e', name: 'Liverpool' },
        { id: 'e722c864-9ce1-42c9-82fa-a80bbed338b2', name: 'Watford' },
        { id: 'f44b6e71-393d-46d6-af8a-f9c6fbc27352', name: 'Everton' },
        { id: 'fdbc2cf9-8b09-4332-ac88-b83dfa0fafd6', name: 'Crystal Palace' },
      ])
      .execute();
  }
}
