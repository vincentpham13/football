import 'reflect-metadata';

import { Container } from 'inversify';
import { TYPES } from '@/constants/di/inversify';
import { CalendarResolver } from '@/app/resolvers/fixtures';

let container: Container;

//* Global mocks
const mockFixtureService = {
  getCalendar: jest.fn(),
};

let calendarResolver: CalendarResolver;

describe('CalenderResolver', () => {
  beforeEach(() => {
    container = new Container();

    container.bind(TYPES.FixtureService).toConstantValue(mockFixtureService);

    calendarResolver = container.resolve(CalendarResolver);
  });

  describe('calendar', () => {
    beforeEach(() => {
      jest.resetAllMocks();

      container.snapshot();
    });

    afterEach(() => {
      container.restore();
    });

    const expected = [
      {
        matchesDate: '1659718800000',
      },
      {
        matchesDate: '1659805200000',
      },
    ];

    it('should return calendar', async () => {
      expect.assertions(1);

      //* Adjust mocked dependencies's behavior
      mockFixtureService.getCalendar.mockResolvedValue(expected);

      //* Assertions
      await expect(calendarResolver.calendar()).resolves.toEqual(expected);
    });
  });
});
