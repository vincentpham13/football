import { container } from '@/inversify/inversify.config';
import { TYPES } from '@/constants/di/inversify';
import { FixtureService } from '@/domain/services';

jest.useFakeTimers();

describe('FixtureService', () => {
  beforeEach(() => {
    container.snapshot();
    jest.clearAllMocks();

    jest.useFakeTimers();
  });

  afterEach(() => {
    container.restore();
  });

  //* Global mocks
  const fixtureRepositoryMock = {
    findPagination: jest.fn().mockResolvedValue([]),
    findMatchDate: jest.fn().mockResolvedValue([]),
  };

  describe('getFixtures', () => {
    beforeEach(() => {
      jest.resetAllMocks();
      fixtureRepositoryMock.findPagination.mockResolvedValue([]);
    });

    it('should return list of fixtures', async () => {
      expect.assertions(3);

      //* Unbind dependencies
      container.unbind(TYPES.FixtureRepository);

      //* Create mocked dependencies

      //* Bind mocked dependencies
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
      fixtureRepositoryMock.findPagination.mockResolvedValue(expected);
      container
        .bind(TYPES.FixtureRepository)
        .toConstantValue(fixtureRepositoryMock);

      const fixtureService = container.get<FixtureService>(
        TYPES.FixtureService,
      );

      //* Assertions
      await expect(fixtureService.getFixtures(10, 0)).resolves.toEqual(
        expected,
      );
      expect(fixtureRepositoryMock.findPagination).toHaveBeenCalledWith(
        10,
        0,
        undefined,
      );
      expect(fixtureRepositoryMock.findMatchDate).not.toHaveBeenCalled();
    });

    it('should return empty list of fixtures', async () => {
      expect.assertions(3);

      //* Unbind dependencies
      container.unbind(TYPES.FixtureRepository);

      //* Create mocked dependencies

      //* Bind mocked dependencies
      container
        .bind(TYPES.FixtureRepository)
        .toConstantValue(fixtureRepositoryMock);

      const fixtureService = container.get<FixtureService>(
        TYPES.FixtureService,
      );

      //* Assertions
      await expect(fixtureService.getFixtures(10, 0)).resolves.toEqual([]);
      expect(fixtureRepositoryMock.findPagination).toHaveBeenCalledWith(
        10,
        0,
        undefined,
      );
      expect(fixtureRepositoryMock.findMatchDate).not.toHaveBeenCalled();
    });
  });

  describe('getCalendar', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      fixtureRepositoryMock.findMatchDate.mockResolvedValue([]);
    });

    it('should return empty list of dates have matches', async () => {
      expect.assertions(2);

      //* Unbind dependencies
      container.unbind(TYPES.FixtureRepository);

      //* Create mocked dependencies

      //* Bind mocked dependencies
      container
        .bind(TYPES.FixtureRepository)
        .toConstantValue(fixtureRepositoryMock);

      const fixtureService = container.get<FixtureService>(
        TYPES.FixtureService,
      );

      //* Assertions
      await expect(fixtureService.getCalendar()).resolves.toEqual([]);
      expect(fixtureRepositoryMock.findPagination).not.toHaveBeenCalled();
    });
  });
});
