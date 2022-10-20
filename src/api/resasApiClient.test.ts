import { rest } from 'msw';
import { forbiddenBody } from 'src/mocks/resolvers/errorForbidden';
import { mockPopulations } from 'src/mocks/resolvers/mockPopulationApi';
import { mockPrefectures } from 'src/mocks/resolvers/mockPrefecturesApi';
import { server } from 'src/mocks/server';
import { RESAS_API_ENDPOINT, RESAS_API_POPULATIONS_PATH, RESAS_API_PREFECTURES_PATH } from './constants';
import { ApiClientError, ApiServerError } from './error';
import { ResasApiClient } from './resasApiClient';

describe('ResasApiClient test', () => {
  const mockPerfCodeFn = jest.fn();
  const mockUrlFn = jest.fn();
  beforeAll(() => {
    server.listen();
    // server.use(
    //   rest.get(RESAS_API_ENDPOINT + RESAS_API_POPULATIONS_PATH, async (req, res, ctx) => {
    //     mockUrlFn(req.url.toString());
    //     mockPerfCodeFn(req.url.searchParams.get('perfCode'));
    //     return res(ctx.json(ctx.body));
    //   })
    // );
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  describe('getPrefectures', () => {
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

  describe('getPopulations', () => {
    test('success', async () => {
      const apiClient = new ResasApiClient();
      const res = await apiClient.getPopulations('1');
      // expect(mockUrlFn).toHaveBeenCalledTimes(1);
      // expect(mockUrlFn).toHaveBeenCalledWith(`${RESAS_API_ENDPOINT + RESAS_API_POPULATIONS_PATH}?perfCode=1&cityCode=-`);
      expect(res).toStrictEqual(mockPopulations.result);
    });

    test('403 Forbidden', async () => {
      server.use(
        rest.get(RESAS_API_ENDPOINT + RESAS_API_POPULATIONS_PATH, (req, res, ctx) =>
          res.once(ctx.status(200), ctx.json(forbiddenBody))
        )
      );

      const apiClient = new ResasApiClient();
      await expect(apiClient.getPopulations('1')).rejects.toThrow(ApiClientError);
    });

    test('429 Too Many Requests', async () => {
      server.use(
        rest.get(RESAS_API_ENDPOINT + RESAS_API_POPULATIONS_PATH, (req, res, ctx) =>
          res.once(ctx.status(429), ctx.json({ message: null }))
        )
      );

      const apiClient = new ResasApiClient();
      await expect(apiClient.getPopulations('1')).rejects.toThrow(ApiClientError);
    });

    test('500 server error', async () => {
      server.use(
        rest.get(RESAS_API_ENDPOINT + RESAS_API_POPULATIONS_PATH, (req, res, ctx) =>
          res.once(ctx.status(500), ctx.json({ message: 'Internal Server Error' }))
        )
      );

      const apiClient = new ResasApiClient();
      await expect(apiClient.getPopulations('1')).rejects.toThrow(ApiServerError);
    });

    test('Unexpected error', async () => {
      server.use(
        rest.get(RESAS_API_ENDPOINT + RESAS_API_POPULATIONS_PATH, (req, res, ctx) =>
          res.once(ctx.json({ message: 'Unexpected Error' }))
        )
      );

      const apiClient = new ResasApiClient();
      await expect(apiClient.getPopulations('1')).rejects.toThrow(
        new Error('unexpected api error (detail: Unexpected Error)')
      );
    });
  });
});
