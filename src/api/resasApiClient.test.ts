import { rest } from 'msw';
import { forbiddenBody } from 'src/mocks/resolvers/errorForbidden';
import { mockPrefectures } from 'src/mocks/resolvers/mockPrefecturesApi';
import { server } from 'src/mocks/server';
import { RESAS_API_ENDPOINT, RESAS_API_PREFECTURES_PATH } from './constants';
import { ApiClientError, ApiServerError } from './error';
import { ResasApiClient } from './resasApiClient';

describe('Resas API Client test', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  test('success', async () => {
    const apiClient = new ResasApiClient();
    const res = await apiClient.getPrefectures();
    expect(res).toStrictEqual(mockPrefectures.result);
  });

  test('403 Forbidden', async () => {
    server.use(
      rest.get(RESAS_API_ENDPOINT + RESAS_API_PREFECTURES_PATH, (req, res, ctx) =>
        res.once(ctx.status(200), ctx.json(forbiddenBody))
      )
    );

    const apiClient = new ResasApiClient();
    await expect(apiClient.getPrefectures()).rejects.toThrow(ApiClientError);
  });

  test('429 Too Many Requests', async () => {
    server.use(
      rest.get(RESAS_API_ENDPOINT + RESAS_API_PREFECTURES_PATH, (req, res, ctx) =>
        res.once(ctx.status(429), ctx.json({ message: null }))
      )
    );

    const apiClient = new ResasApiClient();
    await expect(apiClient.getPrefectures()).rejects.toThrow(ApiClientError);
  });

  test('500 server error', async () => {
    server.use(
      rest.get(RESAS_API_ENDPOINT + RESAS_API_PREFECTURES_PATH, (req, res, ctx) =>
        res.once(ctx.status(500), ctx.json({ message: 'Internal Server Error' }))
      )
    );

    const apiClient = new ResasApiClient();
    await expect(apiClient.getPrefectures()).rejects.toThrow(ApiServerError);
  });

  test('Unexpected error', async () => {
    server.use(
      rest.get(RESAS_API_ENDPOINT + RESAS_API_PREFECTURES_PATH, (req, res, ctx) =>
        res.once(ctx.json({ message: 'Unexpected Error' }))
      )
    );

    const apiClient = new ResasApiClient();
    await expect(apiClient.getPrefectures()).rejects.toThrow(
      new Error('unexpected api error (detail: Unexpected Error)')
    );
  });
});
