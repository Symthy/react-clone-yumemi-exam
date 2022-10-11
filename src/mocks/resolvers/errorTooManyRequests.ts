// eslint-disable-next-line import/no-extraneous-dependencies
import { MockedRequest, ResponseResolver, restContext } from 'msw';

export const tooManyRequests = {
  message: null
};

export const mockPrefecturesApi: ResponseResolver<MockedRequest, typeof restContext> = (req, res, ctx) =>
  res(ctx.status(429), ctx.json(tooManyRequests));
