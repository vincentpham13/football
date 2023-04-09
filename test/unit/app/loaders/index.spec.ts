import 'reflect-metadata';

import { Container } from 'inversify';
import { TYPES } from '@/constants/di/inversify';
import { IDataLoader, TeamLoader, TournamentLoader } from '@/app/loaders';
import { Team, Tournament } from '@/domain/models';

let container: Container;

//* Global mocks
const mockTournamentService = {
  getTournamentsByIds: jest.fn(),
};
const mockTeamService = {
  getTeamsByIds: jest.fn(),
};

let tournamentLoader: IDataLoader<Tournament>;
let teamLoader: IDataLoader<Team>;

describe('TournamentLoader', () => {
  beforeEach(() => {
    container = new Container();

    container
      .bind(TYPES.TournamentService)
      .toConstantValue(mockTournamentService);

    tournamentLoader = container.resolve(TournamentLoader);
  });

  describe('loadById', () => {
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
        name: 'EPL',
      },
      {
        id: '111',
        name: 'Laliga',
      },
    ];

    it('should return tournament', async () => {
      expect.assertions(1);

      //* Adjust mocked dependencies's behavior
      mockTournamentService.getTournamentsByIds.mockResolvedValue(expected);

      //* Assertions
      await expect(tournamentLoader.loadById('123')).resolves.toEqual(
        expected[0],
      );
    });
  });
});

describe('TeamLoader', () => {
  beforeEach(() => {
    container = new Container();

    container.bind(TYPES.TeamService).toConstantValue(mockTeamService);

    teamLoader = container.resolve(TeamLoader);
  });

  describe('loadById', () => {
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
        name: 'Man United',
      },
      {
        id: '111',
        name: 'Man City',
      },
    ];

    it('should return team', async () => {
      expect.assertions(1);

      //* Adjust mocked dependencies's behavior
      mockTeamService.getTeamsByIds.mockResolvedValue(expected);

      //* Assertions
      await expect(teamLoader.loadById('123')).resolves.toEqual(expected[0]);
    });
  });
});
