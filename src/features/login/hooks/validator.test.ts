import { rest } from 'msw';
import { RESAS_API_ENDPOINT, RESAS_API_PREFECTURES_PATH } from 'src/api/constants';
import { ResasApiClient } from 'src/api/resasApiClient';
import * as toastModule from 'src/libs/toast';
import { forbiddenBody } from 'src/mocks/resolvers/errorForbidden';
import { server } from 'src/mocks/server';
import { validateApiKey } from './validator';

describe('validate api key test', () => {
  const spiedOnCustomToaster = jest.spyOn(toastModule, 'onCustomToaster');
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
    spiedOnCustomToaster.mockClear();
  });

  afterAll(() => server.close());

  test('key valid case', async () => {
    const apiClient = new ResasApiClient('dummy-key');
    await expect(validateApiKey(apiClient)).resolves.toBe(true);
    expect(spiedOnCustomToaster).toHaveBeenCalledTimes(0);
  });

  test('key invalid case', async () => {
    server.use(
      rest.get(RESAS_API_ENDPOINT + RESAS_API_PREFECTURES_PATH, (req, res, ctx) =>
        res.once(ctx.status(200), ctx.json(forbiddenBody))
      )
    );
    const apiClient = new ResasApiClient('dummy-key');
    const result = await validateApiKey(apiClient);
    expect(result).toBe(false);
    expect(spiedOnCustomToaster).toHaveBeenCalled();
  });

  test('unexpected error case', async () => {
    server.use(
      rest.get(RESAS_API_ENDPOINT + RESAS_API_PREFECTURES_PATH, (req, res, ctx) =>
        res.once(ctx.status(500), ctx.json({ message: 'Internal Server Error' }))
      )
    );
    const apiClient = new ResasApiClient('dummy-key');
    await expect(validateApiKey(apiClient)).rejects.toThrow(Error);
    expect(spiedOnCustomToaster).toHaveBeenCalledTimes(0);
  });
});
