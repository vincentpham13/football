import 'reflect-metadata';

import { Container } from 'inversify';
import { TYPES } from '@/constants/di/inversify';
import { FixtureResolver } from '@/app/resolvers/fixtures';
import { Fixture } from '@/domain/models';

let container: Container;

//* Global mocks
const mockFixtureService = {
  getFixtures: jest.fn(),
};
const mockTournamentLoader = {
  loadById: jest.fn(),
};
const mockTeamLoader = {
  loadById: jest.fn(),
};

let fixtureResolver: FixtureResolver;

describe('FixtureResolver', () => {
  beforeEach(() => {
    container = new Container();

    container.bind(TYPES.FixtureService).toConstantValue(mockFixtureService);
    container.bind(TYPES.TeamLoader).toConstantValue(mockTeamLoader);
    container
      .bind(TYPES.TournamentLoader)
      .toConstantValue(mockTournamentLoader);

    fixtureResolver = container.resolve(FixtureResolver);
  });

  describe('fixtures', () => {
    beforeEach(() => {
      jest.resetAllMocks();

      container.snapshot();
    });

    afterEach(() => {
      container.restore();
    });

    const expected = [
      {
        id: '123',
        homeTeam: {
          name: 'Man U',
        },
        awayTeam: {
          name: 'Man City',
        },
      },
      {
        id: '111',
        homeTeam: {
          name: 'Chelsea',
        },
        awayTeam: {
          name: 'Tottenham',
        },
      },
    ];

    it('should return empty list of fixtures', async () => {
      expect.assertions(1);

      //* Adjust mocked dependencies's behavior
      mockFixtureService.getFixtures.mockResolvedValue([]);

      //* Assertions
      await expect(fixtureResolver.fixtures()).resolves.toEqual({
        nodes: [],
        pageInfo: {
          hasNextPage: false,
          nextToken: null,
        },
      });
    });

    it("should return a list of fixtures and there's next page", async () => {
      expect.assertions(1);

      //* Adjust mocked dependencies's behavior
      mockFixtureService.getFixtures.mockResolvedValue(expected);

      //* Assertions
      await expect(
        fixtureResolver.fixtures(undefined, 1, undefined),
      ).resolves.toEqual({
        nodes: expected.slice(0, 1),
        pageInfo: {
          hasNextPage: true,
          nextToken: expect.any(String),
        },
      });
    });

    it('should return a list of fixtures using a token', async () => {
      expect.assertions(1);

      //* Adjust mocked dependencies's behavior
      mockFixtureService.getFixtures.mockResolvedValue(expected.slice(-1));

      const token = Buffer.from(
        JSON.stringify({
          perPage: 1,
          offset: 1,
        }),
      ).toString('base64');

      //* Assertions
      await expect(
        fixtureResolver.fixtures(undefined, undefined, token),
      ).resolves.toEqual({
        nodes: expected.slice(-1),
        pageInfo: {
          hasNextPage: false,
          nextToken: null,
        },
      });
    });
  });

  describe('tournament', () => {
    beforeEach(() => {
      jest.resetAllMocks();

      container.snapshot();
    });

    afterEach(() => {
      container.restore();
    });

    const rootFixture = {
      id: 'id',
      tournamentId: '1',
    } as Fixture;

    it('should return a tournament', async () => {
      expect.assertions(1);

      //* Adjust mocked dependencies's behavior
      mockTournamentLoader.loadById.mockResolvedValue({
        id: '1',
        name: 'name',
      });

      //* Assertions
      await expect(fixtureResolver.tournament(rootFixture)).resolves.toEqual({
        id: '1',
        name: 'name',
      });
    });
  });

  describe('homeTeam', () => {
    beforeEach(() => {
      jest.resetAllMocks();

      container.snapshot();
    });

    afterEach(() => {
      container.restore();
    });

    const rootFixture = {
      id: 'id',
      tournamentId: '1',
    } as Fixture;

    it('should return a home team', async () => {
      expect.assertions(1);

      //* Adjust mocked dependencies's behavior
      mockTeamLoader.loadById.mockResolvedValue({
        id: '1',
        name: 'name',
      });

      //* Assertions
      await expect(fixtureResolver.homeTeam(rootFixture)).resolves.toEqual({
        id: '1',
        name: 'name',
      });
    });
  });

  describe('awayTeam', () => {
    beforeEach(() => {
      jest.resetAllMocks();

      container.snapshot();
    });

    afterEach(() => {
      container.restore();
    });

    const rootFixture = {
      id: 'id',
      tournamentId: '1',
    } as Fixture;

    it('should return an away team', async () => {
      expect.assertions(1);

      //* Adjust mocked dependencies's behavior
      mockTeamLoader.loadById.mockResolvedValue({
        id: '1',
        name: 'name',
      });

      //* Assertions
      await expect(fixtureResolver.awayTeam(rootFixture)).resolves.toEqual({
        id: '1',
        name: 'name',
      });
    });
  });
});
