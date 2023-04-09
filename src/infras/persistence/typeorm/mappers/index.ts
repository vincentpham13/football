import { classes } from '@automapper/classes';
import { createMap, createMapper } from '@automapper/core';

import { Team, Tournament, Fixture } from '@/domain/models';

import { FixtureEntity, TeamEntity, TournamentEntity } from '../entities';

const mapper = createMapper({
  strategyInitializer: classes(),
});

createMap(mapper, FixtureEntity, Fixture);
createMap(mapper, TournamentEntity, Tournament);
createMap(mapper, TeamEntity, Team);

export default mapper;
