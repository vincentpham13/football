import { dateTransformer } from '@/infras/utils';

describe('utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should transfer date object to utc string', () => {
    expect.assertions(1);

    const date = new Date();
    const expected = date.toUTCString();

    expect(dateTransformer.from(date)).toEqual(expected);
  });

  it('should do nothing', () => {
    expect.assertions(1);

    const date = new Date();

    expect(dateTransformer.to(date)).toEqual(date);
  });
});
