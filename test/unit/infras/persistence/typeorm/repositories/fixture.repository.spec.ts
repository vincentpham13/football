import { Container } from 'inversify';
import { TYPES } from '@/constants/di/inversify';
import { FixturesRepositoryImpl } from '@/infras/persistence/typeorm/repositories';

let container: Container;

const expected = [
  {
    awayTeamId: '1',
    awayTeamScore: 3,
    homeTeamId: '1',
    homeTeamScore: 3,
    id: '123',
    live: true,
    location: 'Old Traford',
    matchDateTime: '',
    tournamentId: '232323',
  },
];

//* Global mocks
const appDataSourceMock = {
  getRepository: jest.fn(),
  createQueryBuilder: jest.fn(),
};

let fixtureRepository: FixturesRepositoryImpl;

describe('FixtureRepository', () => {
  beforeEach(() => {
    container = new Container();

    container.bind(TYPES.AppDataSource).toConstantValue(appDataSourceMock);
    fixtureRepository = container.resolve(FixturesRepositoryImpl);
  });

  describe('find', () => {
    beforeEach(() => {
      jest.resetAllMocks();

      container.snapshot();
    });

    afterEach(() => {
      container.restore();
    });

    it('should return list of fixtures', async () => {
      expect.assertions(1);
      //* Adjust mocked dependencies behavior
      appDataSourceMock.getRepository.mockResolvedValue({
        find: jest.fn().mockResolvedValue(expected),
      });

      //* Assertions
      await expect(fixtureRepository.find()).resolves.toEqual(expected);
    });

    it('should return empty list', async () => {
      expect.assertions(1);
      //* Adjust mocked dependencies behavior
      appDataSourceMock.getRepository.mockResolvedValue({
        find: jest.fn().mockResolvedValue([]),
      });

      //* Assertions
      await expect(fixtureRepository.find()).resolves.toEqual([]);
    });
  });

  describe('ignore unimplemented method', () => {
    it('should throw an error due to the method is unimplemented yet', async () => {
      expect.assertions(1);

      //* Adjust mocked dependencies behavior

      //* Assertions
      expect(() => fixtureRepository.findByIds([])).toThrow(
        'Method not implemented',
      );
    });
  });

  describe('findPagination', () => {
    beforeEach(() => {
      jest.resetAllMocks();

      container.snapshot();
    });

    afterEach(() => {
      container.restore();
    });

    it('should return an empty list of fixtures', async () => {
      expect.assertions(4);

      //* Adjust mocked dependencies behavior
      const qb = {
        where: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getRawMany: jest.fn(async () => []),
      };
      appDataSourceMock.createQueryBuilder.mockReturnValue({
        from: jest.fn(() => qb),
      });

      const limitQuery = 35;
      const pageIndex = 2;

      //* Assertions
      await expect(
        fixtureRepository.findPagination(limitQuery, pageIndex),
      ).resolves.toEqual([]);
      expect(qb.getRawMany).toHaveBeenCalled();
      expect(qb.where).not.toHaveBeenCalled();
      expect(qb.take).toHaveBeenCalledWith(limitQuery + 1);
    });

    it('should return a list of fixtures', async () => {
      expect.assertions(4);

      //* Adjust mocked dependencies behavior
      const qb = {
        where: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getRawMany: jest.fn(async () => expected),
      };
      appDataSourceMock.createQueryBuilder.mockReturnValue({
        from: jest.fn(() => qb),
      });

      const limitQuery = 35;
      const pageIndex = 2;

      //* Assertions
      await expect(
        fixtureRepository.findPagination(limitQuery, pageIndex),
      ).resolves.toEqual(expected);
      expect(qb.getRawMany).toHaveBeenCalled();
      expect(qb.where).not.toHaveBeenCalled();
      expect(qb.take).toHaveBeenCalledWith(limitQuery + 1);
    });

    it('should return a list of fixtures (for certain day)', async () => {
      expect.assertions(4);

      //* Adjust mocked dependencies behavior
      const qb = {
        where: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getRawMany: jest.fn(async () => expected),
      };
      appDataSourceMock.createQueryBuilder.mockReturnValue({
        from: jest.fn(() => qb),
      });

      const limitQuery = 35;
      const pageIndex = 2;
      const matchesDate = new Date().toISOString();

      //* Assertions
      await expect(
        fixtureRepository.findPagination(limitQuery, pageIndex, matchesDate),
      ).resolves.toEqual(expected);
      expect(qb.getRawMany).toHaveBeenCalled();
      expect(qb.where).toHaveBeenCalled();
      expect(qb.take).toHaveBeenCalledWith(limitQuery + 1);
    });
  });

  describe('findMatchDate', () => {
    beforeEach(() => {
      jest.resetAllMocks();

      container.snapshot();
    });

    afterEach(() => {
      container.restore();
    });

    it('should return a list of the date have matches', async () => {
      expect.assertions(5);

      //* Adjust mocked dependencies behavior
      const expected = [
        {
          matchesDate: '1659632400000',
        },
        {
          matchesDate: '1659718800000',
        },
      ];
      const qb = {
        select: jest.fn().mockReturnThis(),
        from: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn(async () => expected),
      };
      appDataSourceMock.createQueryBuilder.mockReturnValue(qb);

      //* Assertions
      await expect(fixtureRepository.findMatchDate()).resolves.toEqual(
        expected,
      );
      expect(qb.getRawMany).toHaveBeenCalled();
      expect(qb.select).toHaveBeenCalled();
      expect(qb.groupBy).toHaveBeenCalled();
      expect(qb.from).toHaveBeenCalled();
    });
  });
});
