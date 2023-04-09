import { Container } from 'inversify';
import { TYPES } from '@/constants/di/inversify';
import { TeamService } from '@/domain/services';

//! create completely new container for each test

let container: Container;

//* Global mocks
const teamRepositoryMock = {
  findByIds: jest.fn(),
};

describe('TeamService', () => {
  beforeEach(() => {
    container = new Container();

    container.bind(TYPES.TeamRepository).toConstantValue(teamRepositoryMock);
    container.bind<TeamService>(TYPES.TeamService).to(TeamService);
  });

  describe('getTeamsByIds', () => {
    beforeEach(async () => {
      jest.resetAllMocks();

      container.snapshot();
    });

    afterEach(async () => {
      container.restore();
    });

    it('should return list of team', async () => {
      expect.assertions(2);
      //* Create mocked dependencies

      //* Bind mocked dependencies
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
      teamRepositoryMock.findByIds.mockResolvedValue(expected);

      const teamService = container.get<TeamService>(TYPES.TeamService);

      container.unbind(TYPES.TeamRepository);
      //* Assertions
      await expect(teamService.getTeamsByIds(['1', '2'])).resolves.toEqual(
        expected,
      );
      expect(teamRepositoryMock.findByIds).toHaveBeenCalledWith(['1', '2']);
    });

    it('should return an  empty list of team', async () => {
      expect.assertions(1);
      //* Adjust mocked dependencies behavior
      teamRepositoryMock.findByIds.mockResolvedValue([]);

      const teamService = container.get<TeamService>(TYPES.TeamService);

      //* Assertions
      await expect(teamService.getTeamsByIds(['1'])).resolves.toEqual([]);
    });
  });
});
