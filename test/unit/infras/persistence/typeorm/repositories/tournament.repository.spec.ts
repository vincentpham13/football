import { Container } from 'inversify';

import { TYPES } from '@/constants/di/inversify';
import { TournamentRepositoryImpl } from '@/infras/persistence/typeorm/repositories';

let container: Container;

const expected = [
  {
    id: '123',
    name: 'EPL',
  },
  {
    id: '124',
    name: 'World Cup',
  },
];

//* Global mocks
const appDataSourceMock = {
  getRepository: jest.fn(),
};

let tournamentRepository: TournamentRepositoryImpl;

describe('TournamentRepository', () => {
  beforeEach(() => {
    container = new Container();

    container.bind(TYPES.AppDataSource).toConstantValue(appDataSourceMock);
    tournamentRepository = container.resolve(TournamentRepositoryImpl);
  });

  describe('find', () => {
    beforeEach(() => {
      jest.resetAllMocks();

      container.snapshot();
    });

    afterEach(() => {
      container.restore();
    });

    it('should return list of tournaments', async () => {
      expect.assertions(1);
      //* Adjust mocked dependencies behavior
      appDataSourceMock.getRepository.mockResolvedValue({
        find: jest.fn().mockResolvedValue(expected),
      });

      //* Assertions
      await expect(tournamentRepository.find()).resolves.toEqual(expected);
    });
  });

  describe('findByIds', () => {
    beforeEach(() => {
      jest.resetAllMocks();

      container.snapshot();
    });

    afterEach(() => {
      container.restore();
    });

    it('should return list of tournaments', async () => {
      expect.assertions(2);
      //* Adjust mocked dependencies behavior
      const findMock = jest.fn().mockResolvedValue(expected);
      appDataSourceMock.getRepository.mockResolvedValue({
        find: findMock,
      });

      //* Assertions
      await expect(tournamentRepository.findByIds(['123'])).resolves.toEqual(
        expected,
      );
      expect(findMock).toHaveBeenCalledWith({
        where: {
          id: expect.anything(),
        },
      });
    });
  });
});
