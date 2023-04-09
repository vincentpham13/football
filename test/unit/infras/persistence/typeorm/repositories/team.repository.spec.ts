import { Container } from 'inversify';
import { TYPES } from '@/constants/di/inversify';
import { TeamRepositoryImpl } from '@/infras/persistence/typeorm/repositories';

let container: Container;

const expected = [
  {
    id: '123',
    name: 'Man United',
  },
  {
    id: '124',
    name: 'Man City',
  },
];

//* Global mocks
const appDataSourceMock = {
  getRepository: jest.fn(),
};

let teamRepository: TeamRepositoryImpl;

describe('TeamRepository', () => {
  beforeEach(() => {
    container = new Container();

    container.bind(TYPES.AppDataSource).toConstantValue(appDataSourceMock);
    teamRepository = container.resolve(TeamRepositoryImpl);
  });

  describe('find', () => {
    beforeEach(() => {
      jest.resetAllMocks();

      container.snapshot();
    });

    afterEach(() => {
      container.restore();
    });

    it('should return list of teams', async () => {
      expect.assertions(1);
      //* Adjust mocked dependencies behavior
      appDataSourceMock.getRepository.mockResolvedValue({
        find: jest.fn().mockResolvedValue(expected),
      });

      //* Assertions
      await expect(teamRepository.find()).resolves.toEqual(expected);
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

    it('should return list of teams', async () => {
      expect.assertions(2);
      //* Adjust mocked dependencies behavior
      const findMock = jest.fn().mockResolvedValue(expected);
      appDataSourceMock.getRepository.mockResolvedValue({
        find: findMock,
      });

      //* Assertions
      await expect(teamRepository.findByIds(['123'])).resolves.toEqual(
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
