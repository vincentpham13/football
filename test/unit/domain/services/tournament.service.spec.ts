import { container } from '@/inversify/inversify.config';
import { TYPES } from '@/constants/di/inversify';
import { TournamentService } from '@/domain/services';

jest.useFakeTimers();

const containerTest = container.createChild();

describe('TournamentService', () => {
  beforeEach(() => {
    containerTest.snapshot();
    jest.clearAllMocks();

    jest.useFakeTimers();
  });

  afterEach(() => {
    containerTest.restore();
  });

  //* Global mocks
  const tournamentRepositoryMock = {
    findByIds: jest.fn().mockResolvedValue([]),
  };

  describe('getTournamentsByIds', () => {
    beforeEach(() => {
      jest.resetAllMocks();
      tournamentRepositoryMock.findByIds.mockResolvedValue([]);
    });

    it('should return list of tournaments', async () => {
      expect.assertions(2);

      //* Create, prepare mocked dependencies
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
      tournamentRepositoryMock.findByIds.mockResolvedValue(expected);

      //* Bind mocked dependencies to override
      containerTest
        .bind(TYPES.TournamentRepository)
        .toConstantValue(tournamentRepositoryMock);

      const tournamentService = containerTest.get<TournamentService>(
        TYPES.TournamentService,
      );

      //* Assertions
      await expect(
        tournamentService.getTournamentsByIds(['1', '2']),
      ).resolves.toEqual(expected);
      expect(tournamentRepositoryMock.findByIds).toHaveBeenCalledWith([
        '1',
        '2',
      ]);
    });
  });
});
