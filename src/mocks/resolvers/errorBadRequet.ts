// eslint-disable-next-line import/no-extraneous-dependencies
import { MockedRequest, ResponseResolver, restContext } from 'msw';

const badRequestBody = '400';

export const badRequest: ResponseResolver<MockedRequest, typeof restContext> = (req, res, ctx) =>
  res(ctx.status(200), ctx.json(badRequestBody));
